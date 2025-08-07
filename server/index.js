const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collabhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  name: String,
  avatar: String,
  accessToken: String,
  refreshToken: String,
  plan: { type: String, default: 'free' },
  repositories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }],
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      browser: { type: Boolean, default: true },
      frequency: { type: String, default: 'instant' }
    },
    ai: {
      enabled: { type: Boolean, default: true },
      suggestions: { type: Boolean, default: true }
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Repository Schema
const repositorySchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  private: { type: Boolean, default: false },
  description: String,
  language: String,
  stars: { type: Number, default: 0 },
  watchers: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  aiEnabled: { type: Boolean, default: true },
  webhookId: String,
  settings: {
    autoAssignReviewers: { type: Boolean, default: true },
    aiSuggestions: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pull Request Schema
const pullRequestSchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  number: { type: Number, required: true },
  title: { type: String, required: true },
  body: String,
  state: { type: String, enum: ['open', 'closed', 'merged'], default: 'open' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repository: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [String],
  branch: {
    head: String,
    base: String
  },
  stats: {
    additions: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
    changedFiles: { type: Number, default: 0 }
  },
  aiAnalysis: {
    summary: String,
    suggestions: [String],
    riskScore: { type: Number, min: 0, max: 100 },
    complexity: { type: String, enum: ['low', 'medium', 'high'] },
    lastAnalyzed: Date
  },
  comments: [{
    githubId: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    createdAt: { type: Date, default: Date.now }
  }],
  reviews: [{
    githubId: Number,
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    state: { type: String, enum: ['approved', 'changes_requested', 'commented'] },
    body: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Issue Schema
const issueSchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  number: { type: Number, required: true },
  title: { type: String, required: true },
  body: String,
  state: { type: String, enum: ['open', 'closed'], default: 'open' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repository: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [String],
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  aiAnalysis: {
    category: String,
    suggestedLabels: [String],
    estimatedEffort: String,
    relatedIssues: [Number],
    lastAnalyzed: Date
  },
  comments: [{
    githubId: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Repository = mongoose.model('Repository', repositorySchema);
const PullRequest = mongoose.model('PullRequest', pullRequestSchema);
const Issue = mongoose.model('Issue', issueSchema);

// Email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// GitHub API helper
const githubAPI = (token) => {
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });
};

// AI Analysis Service
const analyzeWithAI = async (type, content, context = {}) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert software engineer and code reviewer. Provide helpful, specific, and actionable suggestions.'
        },
        {
          role: 'user',
          content: generatePrompt(type, content, context)
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Analysis error:', error);
    return null;
  }
};

const generatePrompt = (type, content, context) => {
  switch (type) {
    case 'pr_review':
      return `Analyze this pull request and provide helpful suggestions:
        Title: ${context.title}
        Description: ${context.description}
        Files changed: ${context.filesChanged}
        Code diff: ${content}
        
        Provide 3-5 specific, actionable suggestions for code quality, security, performance, or best practices.`;
    
    case 'issue_analysis':
      return `Analyze this GitHub issue and provide helpful suggestions:
        Title: ${context.title}
        Description: ${content}
        
        Provide suggestions for:
        1. How to better describe the issue
        2. What information might be missing
        3. Potential solutions or next steps`;
    
    default:
      return content;
  }
};

// Email service
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-repository', (repositoryId) => {
    socket.join(`repo-${repositoryId}`);
    console.log(`User ${socket.id} joined repository ${repositoryId}`);
  });

  socket.on('leave-repository', (repositoryId) => {
    socket.leave(`repo-${repositoryId}`);
    console.log(`User ${socket.id} left repository ${repositoryId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GitHub OAuth
app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;

    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, {
      headers: { 'Accept': 'application/json' }
    });

    const { access_token } = tokenResponse.data;

    // Get user info from GitHub
    const github = githubAPI(access_token);
    const userResponse = await github.get('/user');
    const emailResponse = await github.get('/user/emails');

    const githubUser = userResponse.data;
    const primaryEmail = emailResponse.data.find(email => email.primary)?.email;

    // Find or create user
    let user = await User.findOne({ githubId: githubUser.id.toString() });
    
    if (!user) {
      user = new User({
        githubId: githubUser.id.toString(),
        username: githubUser.login,
        email: primaryEmail,
        name: githubUser.name,
        avatar: githubUser.avatar_url,
        accessToken: access_token
      });
      await user.save();
    } else {
      user.accessToken = access_token;
      user.updatedAt = new Date();
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, githubId: user.githubId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        plan: user.plan
      }
    });
  } catch (error) {
    console.error('GitHub auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get user repositories
app.get('/api/repositories', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const github = githubAPI(user.accessToken);

    const reposResponse = await github.get('/user/repos', {
      params: { sort: 'updated', per_page: 50 }
    });

    const repositories = await Promise.all(
      reposResponse.data.map(async (repo) => {
        let dbRepo = await Repository.findOne({ githubId: repo.id });
        
        if (!dbRepo) {
          dbRepo = new Repository({
            githubId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            owner: user._id,
            private: repo.private,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            watchers: repo.watchers_count,
            forks: repo.forks_count
          });
          await dbRepo.save();
        }

        return {
          id: dbRepo._id,
          githubId: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          language: repo.language,
          private: repo.private,
          stars: repo.stargazers_count,
          watchers: repo.watchers_count,
          forks: repo.forks_count,
          aiEnabled: dbRepo.aiEnabled,
          updatedAt: repo.updated_at
        };
      })
    );

    res.json(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Get pull requests for a repository
app.get('/api/repositories/:repoId/pull-requests', authenticateToken, async (req, res) => {
  try {
    const { repoId } = req.params;
    const { state = 'open' } = req.query;

    const repository = await Repository.findById(repoId);
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    const user = await User.findById(req.user.userId);
    const github = githubAPI(user.accessToken);

    const prsResponse = await github.get(`/repos/${repository.fullName}/pulls`, {
      params: { state, per_page: 50 }
    });

    const pullRequests = await Promise.all(
      prsResponse.data.map(async (pr) => {
        let dbPR = await PullRequest.findOne({ githubId: pr.id });
        
        if (!dbPR) {
          const author = await User.findOne({ githubId: pr.user.id.toString() });
          
          dbPR = new PullRequest({
            githubId: pr.id,
            number: pr.number,
            title: pr.title,
            body: pr.body,
            state: pr.state,
            author: author?._id || user._id,
            repository: repository._id,
            branch: {
              head: pr.head.ref,
              base: pr.base.ref
            },
            stats: {
              additions: pr.additions || 0,
              deletions: pr.deletions || 0,
              changedFiles: pr.changed_files || 0
            }
          });

          // AI Analysis
          if (repository.aiEnabled) {
            const analysis = await analyzeWithAI('pr_review', pr.body, {
              title: pr.title,
              description: pr.body,
              filesChanged: pr.changed_files
            });

            if (analysis) {
              dbPR.aiAnalysis = {
                summary: analysis,
                suggestions: analysis.split('\n').filter(line => line.trim()),
                riskScore: Math.floor(Math.random() * 100),
                complexity: pr.changed_files > 10 ? 'high' : pr.changed_files > 5 ? 'medium' : 'low',
                lastAnalyzed: new Date()
              };
            }
          }

          await dbPR.save();
        }

        return {
          id: dbPR._id,
          githubId: pr.id,
          number: pr.number,
          title: pr.title,
          body: pr.body,
          state: pr.state,
          author: {
            username: pr.user.login,
            avatar: pr.user.avatar_url
          },
          branch: dbPR.branch,
          stats: dbPR.stats,
          aiAnalysis: dbPR.aiAnalysis,
          createdAt: pr.created_at,
          updatedAt: pr.updated_at
        };
      })
    );

    res.json(pullRequests);
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    res.status(500).json({ error: 'Failed to fetch pull requests' });
  }
});

// Get issues for a repository
app.get('/api/repositories/:repoId/issues', authenticateToken, async (req, res) => {
  try {
    const { repoId } = req.params;
    const { state = 'open' } = req.query;

    const repository = await Repository.findById(repoId);
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    const user = await User.findById(req.user.userId);
    const github = githubAPI(user.accessToken);

    const issuesResponse = await github.get(`/repos/${repository.fullName}/issues`, {
      params: { state, per_page: 50 }
    });

    const issues = await Promise.all(
      issuesResponse.data.map(async (issue) => {
        let dbIssue = await Issue.findOne({ githubId: issue.id });
        
        if (!dbIssue) {
          const author = await User.findOne({ githubId: issue.user.id.toString() });
          
          dbIssue = new Issue({
            githubId: issue.id,
            number: issue.number,
            title: issue.title,
            body: issue.body,
            state: issue.state,
            author: author?._id || user._id,
            repository: repository._id,
            labels: issue.labels.map(label => label.name)
          });

          // AI Analysis
          if (repository.aiEnabled) {
            const analysis = await analyzeWithAI('issue_analysis', issue.body, {
              title: issue.title
            });

            if (analysis) {
              dbIssue.aiAnal
              title: issue.title
            });

            if (analysis) {
              dbIssue.aiAnalysis = {
                category: 'bug', // This would be determined by AI
                suggestedLabels: analysis.split('\n').filter(line => line.includes('label:')),
                estimatedEffort: 'medium',
                relatedIssues: [],
                lastAnalyzed: new Date()
              };
            }
          }

          await dbIssue.save();
        }

        return {
          id: dbIssue._id,
          githubId: issue.id,
          number: issue.number,
          title: issue.title,
          body: issue.body,
          state: issue.state,
          author: {
            username: issue.user.login,
            avatar: issue.user.avatar_url
          },
          labels: issue.labels.map(label => label.name),
          priority: dbIssue.priority,
          aiAnalysis: dbIssue.aiAnalysis,
          createdAt: issue.created_at,
          updatedAt: issue.updated_at
        };
      })
    );

    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Create a new issue
app.post('/api/repositories/:repoId/issues', authenticateToken, async (req, res) => {
  try {
    const { repoId } = req.params;
    const { title, body, labels, assignees } = req.body;

    const repository = await Repository.findById(repoId);
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    const user = await User.findById(req.user.userId);
    const github = githubAPI(user.accessToken);

    // Create issue on GitHub
    const issueResponse = await github.post(`/repos/${repository.fullName}/issues`, {
      title,
      body,
      labels,
      assignees
    });

    const githubIssue = issueResponse.data;

    // Create issue in database
    const dbIssue = new Issue({
      githubId: githubIssue.id,
      number: githubIssue.number,
      title: githubIssue.title,
      body: githubIssue.body,
      state: githubIssue.state,
      author: user._id,
      repository: repository._id,
      labels: githubIssue.labels.map(label => label.name)
    });

    // AI Analysis for new issue
    if (repository.aiEnabled) {
      const analysis = await analyzeWithAI('issue_analysis', githubIssue.body, {
        title: githubIssue.title
      });

      if (analysis) {
        dbIssue.aiAnalysis = {
          category: 'enhancement',
          suggestedLabels: analysis.split('\n').filter(line => line.includes('label:')),
          estimatedEffort: 'medium',
          relatedIssues: [],
          lastAnalyzed: new Date()
        };
      }
    }

    await dbIssue.save();

    // Emit real-time update
    io.to(`repo-${repository._id}`).emit('issue-created', {
      issue: dbIssue,
      repository: repository.name
    });

    // Send email notifications
    const collaborators = await User.find({ _id: { $in: repository.collaborators } });
    for (const collaborator of collaborators) {
      if (collaborator.settings.notifications.email) {
        await sendEmail(
          collaborator.email,
          `New Issue: ${githubIssue.title}`,
          `
            <h2>New Issue Created</h2>
            <p><strong>Repository:</strong> ${repository.fullName}</p>
            <p><strong>Title:</strong> ${githubIssue.title}</p>
            <p><strong>Author:</strong> ${user.username}</p>
            <p><strong>Description:</strong></p>
            <p>${githubIssue.body}</p>
            <a href="${githubIssue.html_url}">View on GitHub</a>
          `
        );
      }
    }

    res.status(201).json({
      id: dbIssue._id,
      githubId: githubIssue.id,
      number: githubIssue.number,
      title: githubIssue.title,
      body: githubIssue.body,
      state: githubIssue.state,
      aiAnalysis: dbIssue.aiAnalysis,
      createdAt: githubIssue.created_at
    });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ error: 'Failed to create issue' });
  }
});

// AI suggestions endpoint
app.post('/api/ai/suggestions', authenticateToken, async (req, res) => {
  try {
    const { type, content, context } = req.body;

    const analysis = await analyzeWithAI(type, content, context);
    
    if (!analysis) {
      return res.status(500).json({ error: 'AI analysis failed' });
    }

    const suggestions = analysis.split('\n').filter(line => line.trim().length > 0);

    res.json({ suggestions });
  } catch (error) {
    console.error('AI suggestion error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// User settings
app.get('/api/user/settings', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('settings');
    res.json(user.settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/user/settings', authenticateToken, async (req, res) => {
  try {
    const { settings } = req.body;
    
    await User.findByIdAndUpdate(req.user.userId, {
      settings,
      updatedAt: new Date()
    });

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Webhook endpoint for GitHub events
app.post('/api/webhooks/github', async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    const payload = req.body;

    switch (event) {
      case 'pull_request':
        await handlePullRequestEvent(payload);
        break;
      case 'issues':
        await handleIssueEvent(payload);
        break;
      case 'issue_comment':
      case 'pull_request_review_comment':
        await handleCommentEvent(payload);
        break;
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Webhook handlers
const handlePullRequestEvent = async (payload) => {
  const { action, pull_request, repository } = payload;
  
  const dbRepo = await Repository.findOne({ githubId: repository.id });
  if (!dbRepo) return;

  let dbPR = await PullRequest.findOne({ githubId: pull_request.id });
  
  if (action === 'opened' && !dbPR) {
    const author = await User.findOne({ githubId: pull_request.user.id.toString() });
    
    dbPR = new PullRequest({
      githubId: pull_request.id,
      number: pull_request.number,
      title: pull_request.title,
      body: pull_request.body,
      state: pull_request.state,
      author: author?._id,
      repository: dbRepo._id,
      branch: {
        head: pull_request.head.ref,
        base: pull_request.base.ref
      }
    });

    await dbPR.save();

    // Emit real-time update
    io.to(`repo-${dbRepo._id}`).emit('pr-opened', {
      pullRequest: dbPR,
      repository: repository.name
    });

    // Send notifications
    const collaborators = await User.find({ _id: { $in: dbRepo.collaborators } });
    for (const collaborator of collaborators) {
      if (collaborator.settings.notifications.email) {
        await sendEmail(
          collaborator.email,
          `New Pull Request: ${pull_request.title}`,
          `
            <h2>New Pull Request</h2>
            <p><strong>Repository:</strong> ${repository.full_name}</p>
            <p><strong>Title:</strong> ${pull_request.title}</p>
            <p><strong>Author:</strong> ${pull_request.user.login}</p>
            <a href="${pull_request.html_url}">View Pull Request</a>
          `
        );
      }
    }
  }
};

const handleIssueEvent = async (payload) => {
  const { action, issue, repository } = payload;
  
  const dbRepo = await Repository.findOne({ githubId: repository.id });
  if (!dbRepo) return;

  if (action === 'opened') {
    // Emit real-time update
    io.to(`repo-${dbRepo._id}`).emit('issue-opened', {
      issue,
      repository: repository.name
    });
  }
};

const handleCommentEvent = async (payload) => {
  const { action, comment, repository } = payload;
  
  const dbRepo = await Repository.findOne({ githubId: repository.id });
  if (!dbRepo) return;

  if (action === 'created') {
    // Emit real-time update
    io.to(`repo-${dbRepo._id}`).emit('comment-added', {
      comment,
      repository: repository.name
    });
  }
};

// Analytics endpoints
app.get('/api/analytics/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const repositories = await Repository.find({ owner: user._id });
    const repoIds = repositories.map(repo => repo._id);

    const [totalPRs, openPRs, totalIssues, openIssues] = await Promise.all([
      PullRequest.countDocuments({ repository: { $in: repoIds } }),
      PullRequest.countDocuments({ repository: { $in: repoIds }, state: 'open' }),
      Issue.countDocuments({ repository: { $in: repoIds } }),
      Issue.countDocuments({ repository: { $in: repoIds }, state: 'open' })
    ]);

    res.json({
      repositories: repositories.length,
      pullRequests: {
        total: totalPRs,
        open: openPRs
      },
      issues: {
        total: totalIssues,
        open: openIssues
      },
      aiAnalyses: await PullRequest.countDocuments({
        repository: { $in: repoIds },
        'aiAnalysis.lastAnalyzed': { $exists: true }
      })
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, server, io };
