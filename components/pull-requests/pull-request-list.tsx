'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { GitPullRequest, MessageSquare, CheckCircle, Clock, Brain, ThumbsUp, ThumbsDown, Eye, GitBranch, FileText, Plus, Minus, MoreHorizontal, ExternalLink, GitMerge } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const pullRequests = [
  {
    id: 1,
    title: 'Implement advanced user authentication system with JWT and OAuth',
    description: 'Complete implementation of JWT-based authentication with refresh tokens, role-based access control, and OAuth integration for GitHub and Google.',
    author: 'John Doe',
    avatar: '/placeholder.svg?height=32&width=32',
    repository: 'awesome-project',
    branch: { head: 'feature/auth-system', base: 'main' },
    status: 'open',
    reviewStatus: 'pending',
    createdAt: '2 hours ago',
    updatedAt: '30 minutes ago',
    comments: 8,
    approvals: 2,
    changesRequested: 0,
    reviewers: [
      { name: 'Alice Johnson', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' },
      { name: 'Bob Wilson', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' },
      { name: 'Charlie Brown', avatar: '/placeholder.svg?height=24&width=24', status: 'pending' }
    ],
    filesChanged: 15,
    additions: 342,
    deletions: 28,
    labels: ['feature', 'authentication', 'security'],
    aiAnalysis: {
      riskScore: 25,
      complexity: 'medium',
      suggestions: [
        'Consider adding input validation for email format in auth middleware',
        'Add rate limiting to prevent brute force attacks on login endpoints',
        'Include comprehensive unit tests for authentication flows',
        'Review error handling to prevent information leakage'
      ],
      codeQuality: 92,
      testCoverage: 85
    }
  },
  {
    id: 2,
    title: 'Fix responsive design issues on mobile devices',
    description: 'Resolve layout problems on small screens, improve touch interactions, and enhance mobile user experience across all components.',
    author: 'Jane Smith',
    avatar: '/placeholder.svg?height=32&width=32',
    repository: 'mobile-app',
    branch: { head: 'fix/mobile-responsive', base: 'develop' },
    status: 'open',
    reviewStatus: 'approved',
    createdAt: '1 day ago',
    updatedAt: '2 hours ago',
    comments: 5,
    approvals: 3,
    changesRequested: 0,
    reviewers: [
      { name: 'John Doe', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' },
      { name: 'Alice Johnson', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' },
      { name: 'David Lee', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' }
    ],
    filesChanged: 12,
    additions: 156,
    deletions: 89,
    labels: ['bugfix', 'mobile', 'ui'],
    aiAnalysis: {
      riskScore: 15,
      complexity: 'low',
      suggestions: [
        'Excellent work on responsive breakpoints implementation',
        'Consider testing on more device sizes for better coverage',
        'Add CSS media queries for better tablet support',
        'Great improvement in touch target sizes'
      ],
      codeQuality: 96,
      testCoverage: 78
    }
  },
  {
    id: 3,
    title: 'Optimize database queries for improved performance',
    description: 'Refactor slow database queries, add proper indexing, implement connection pooling, and optimize data fetching patterns.',
    author: 'Bob Wilson',
    avatar: '/placeholder.svg?height=32&width=32',
    repository: 'ml-pipeline',
    branch: { head: 'perf/db-optimization', base: 'main' },
    status: 'open',
    reviewStatus: 'changes_requested',
    createdAt: '3 days ago',
    updatedAt: '1 day ago',
    comments: 12,
    approvals: 1,
    changesRequested: 2,
    reviewers: [
      { name: 'Alice Johnson', avatar: '/placeholder.svg?height=24&width=24', status: 'approved' },
      { name: 'Charlie Brown', avatar: '/placeholder.svg?height=24&width=24', status: 'changes_requested' },
      { name: 'Emma Davis', avatar: '/placeholder.svg?height=24&width=24', status: 'changes_requested' }
    ],
    filesChanged: 8,
    additions: 89,
    deletions: 156,
    labels: ['performance', 'database', 'optimization'],
    aiAnalysis: {
      riskScore: 45,
      complexity: 'high',
      suggestions: [
        'Add database connection pooling configuration',
        'Consider using prepared statements for better security',
        'Add query performance monitoring and logging',
        'Review transaction boundaries for optimal performance'
      ],
      codeQuality: 88,
      testCoverage: 92
    }
  }
]

export function PullRequestList() {
  const [selectedPR, setSelectedPR] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      case 'merged': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'changes_requested': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600'
    if (score < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {pullRequests.map((pr) => (
        <Card key={pr.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getStatusColor(pr.status)}>
                    <GitPullRequest className="mr-1 h-3 w-3" />
                    {pr.status}
                  </Badge>
                  <Badge className={getReviewStatusColor(pr.reviewStatus)}>
                    {pr.reviewStatus === 'approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                    {pr.reviewStatus === 'changes_requested' && <ThumbsDown className="mr-1 h-3 w-3" />}
                    {pr.reviewStatus === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                    {pr.reviewStatus.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline">{pr.repository}</Badge>
                  <span className="text-xs text-muted-foreground">#{pr.id}</span>
                </div>
                
                <CardTitle className="text-xl mb-2 leading-tight">
                  <Link href={`/dashboard/pull-requests/${pr.id}`} className="hover:text-primary transition-colors">
                    {pr.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="mb-4 leading-relaxed">
                  {pr.description}
                </CardDescription>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={pr.avatar || "/placeholder.svg"} alt={pr.author} />
                      <AvatarFallback className="text-xs">
                        {pr.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{pr.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <GitBranch className="h-4 w-4" />
                    <span>{pr.branch.head} → {pr.branch.base}</span>
                  </div>
                  <span>•</span>
                  <span>{pr.createdAt}</span>
                </div>
                
                {/* Reviewers */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium">Reviewers:</span>
                  <div className="flex items-center space-x-1">
                    {pr.reviewers.map((reviewer, index) => (
                      <div key={index} className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reviewer.avatar || "/placeholder.svg"} alt={reviewer.name} />
                          <AvatarFallback className="text-xs">
                            {reviewer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          reviewer.status === 'approved' ? 'bg-green-500' :
                          reviewer.status === 'changes_requested' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {pr.labels.map((label, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/pull-requests/${pr.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedPR(selectedPR === pr.id ? null : pr.id)}
                  className={selectedPR === pr.id ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  AI Insights
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Request Changes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <GitMerge className="mr-2 h-4 w-4" />
                      Merge
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on GitHub
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{pr.comments} comments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  <span>{pr.approvals}</span>
                </div>
                {pr.changesRequested > 0 && (
                  <div className="flex items-center space-x-1">
                    <ThumbsDown className="h-4 w-4 text-red-600" />
                    <span>{pr.changesRequested}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{pr.filesChanged} files</span>
                </div>
              </div>
              <div className="text-muted-foreground flex items-center space-x-2">
                <span className="text-green-600 flex items-center">
                  <Plus className="h-3 w-3 mr-1" />
                  {pr.additions}
                </span>
                <span className="text-red-600 flex items-center">
                  <Minus className="h-3 w-3 mr-1" />
                  {pr.deletions}
                </span>
              </div>
            </div>

            {selectedPR === pr.id && (
              <div className="border-t pt-6 space-y-6 animate-slide-down">
                {/* AI Analysis */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    AI Code Analysis
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getRiskColor(pr.aiAnalysis.riskScore)}`}>
                        {pr.aiAnalysis.riskScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">Risk Score</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {pr.aiAnalysis.codeQuality}%
                      </div>
                      <p className="text-xs text-muted-foreground">Code Quality</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {pr.aiAnalysis.testCoverage}%
                      </div>
                      <p className="text-xs text-muted-foreground">Test Coverage</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Complexity: 
                      <Badge variant="outline" className="ml-2 capitalize">
                        {pr.aiAnalysis.complexity}
                      </Badge>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">AI Suggestions</p>
                    <ul className="space-y-2">
                      {pr.aiAnalysis.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm bg-background/50 p-3 rounded-lg border">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Comment Section */}
                <div>
                  <h4 className="font-semibold mb-3">Add Review Comment</h4>
                  <Textarea
                    placeholder="Leave a review comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Comment
                    </Button>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Request Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
