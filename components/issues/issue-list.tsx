'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Bug, AlertCircle, CheckCircle, Clock, Brain, MessageSquare, Tag, User, Calendar, GitBranch, Eye, ThumbsUp, MoreHorizontal, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const issues = [
  {
    id: 1,
    title: 'Memory leak in data processing pipeline causing application crashes',
    description: 'The application consumes increasing amounts of memory during large data processing tasks, eventually leading to crashes after processing 10GB+ datasets.',
    author: 'Bob Wilson',
    avatar: '/placeholder.svg?height=32&width=32',
    assignee: 'Alice Johnson',
    assigneeAvatar: '/placeholder.svg?height=24&width=24',
    repository: 'ml-pipeline',
    status: 'open',
    priority: 'critical',
    labels: ['bug', 'performance', 'memory', 'urgent'],
    createdAt: '2 hours ago',
    updatedAt: '30 minutes ago',
    comments: 8,
    reactions: 5,
    progress: 25,
    aiAnalysis: {
      category: 'Performance Issue',
      confidence: 95,
      suggestedLabels: ['memory-leak', 'performance', 'critical'],
      estimatedEffort: '3-5 days',
      relatedIssues: [15, 23],
      suggestions: [
        'Check for unclosed database connections in the data processing loop',
        'Review memory allocation patterns in the batch processing functions',
        'Consider implementing memory pooling for large dataset operations',
        'Add memory usage monitoring and alerts'
      ]
    }
  },
  {
    id: 2,
    title: 'Add dark mode support to dashboard interface',
    description: 'Users have requested dark mode functionality for better user experience during night time usage. This should include proper contrast ratios and accessibility compliance.',
    author: 'Jane Smith',
    avatar: '/placeholder.svg?height=32&width=32',
    assignee: 'John Doe',
    assigneeAvatar: '/placeholder.svg?height=24&width=24',
    repository: 'awesome-project',
    status: 'in_progress',
    priority: 'medium',
    labels: ['enhancement', 'ui', 'accessibility', 'design'],
    createdAt: '1 day ago',
    updatedAt: '2 hours ago',
    comments: 12,
    reactions: 15,
    progress: 60,
    aiAnalysis: {
      category: 'Feature Enhancement',
      confidence: 88,
      suggestedLabels: ['ui-improvement', 'accessibility', 'user-experience'],
      estimatedEffort: '1-2 weeks',
      relatedIssues: [8, 19],
      suggestions: [
        'Use CSS custom properties for theme switching',
        'Implement system preference detection',
        'Add toggle animation for smooth transitions',
        'Ensure WCAG 2.1 AA compliance for color contrast'
      ]
    }
  },
  {
    id: 3,
    title: 'API rate limiting not working correctly for authenticated users',
    description: 'The rate limiting middleware is not properly throttling requests for authenticated users, allowing them to exceed the defined limits and potentially overload the server.',
    author: 'Charlie Brown',
    avatar: '/placeholder.svg?height=32&width=32',
    assignee: null,
    repository: 'mobile-app',
    status: 'open',
    priority: 'high',
    labels: ['bug', 'security', 'api', 'backend'],
    createdAt: '3 days ago',
    updatedAt: '1 day ago',
    comments: 6,
    reactions: 3,
    progress: 0,
    aiAnalysis: {
      category: 'Security Issue',
      confidence: 92,
      suggestedLabels: ['security-vulnerability', 'api-bug', 'rate-limiting'],
      estimatedEffort: '2-3 days',
      relatedIssues: [12],
      suggestions: [
        'Review Redis configuration for rate limiting storage',
        'Check middleware execution order in the request pipeline',
        'Add comprehensive rate limiting tests for authenticated routes',
        'Implement proper error handling for rate limit exceeded scenarios'
      ]
    }
  },
  {
    id: 4,
    title: 'Improve documentation for new contributor onboarding',
    description: 'Current documentation lacks clear setup instructions and contribution guidelines, making it difficult for new contributors to get started with the project.',
    author: 'David Lee',
    avatar: '/placeholder.svg?height=32&width=32',
    assignee: 'Emma Davis',
    assigneeAvatar: '/placeholder.svg?height=24&width=24',
    repository: 'awesome-project',
    status: 'open',
    priority: 'low',
    labels: ['documentation', 'good-first-issue', 'help-wanted'],
    createdAt: '1 week ago',
    updatedAt: '3 days ago',
    comments: 4,
    reactions: 8,
    progress: 40,
    aiAnalysis: {
      category: 'Documentation',
      confidence: 85,
      suggestedLabels: ['documentation', 'onboarding', 'contributor-experience'],
      estimatedEffort: '1 week',
      relatedIssues: [],
      suggestions: [
        'Create step-by-step setup guide with screenshots',
        'Add troubleshooting section for common issues',
        'Include code style guidelines and examples',
        'Create video walkthrough for complex setup steps'
      ]
    }
  }
]

export function IssueList() {
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'closed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />
      case 'in_progress': return <Clock className="h-4 w-4" />
      case 'closed': return <CheckCircle className="h-4 w-4" />
      default: return <Bug className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {issues.map((issue, index) => (
        <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-lift">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getStatusColor(issue.status)}>
                    {getStatusIcon(issue.status)}
                    <span className="ml-1 capitalize">{issue.status.replace('_', ' ')}</span>
                  </Badge>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(issue.priority)}`} title={`${issue.priority} priority`} />
                  <Badge variant="outline">{issue.repository}</Badge>
                  <span className="text-xs text-muted-foreground">#{issue.id}</span>
                </div>
                
                <CardTitle className="text-xl mb-2 leading-tight">
                  <Link href={`/dashboard/issues/${issue.id}`} className="hover:text-primary transition-colors">
                    {issue.title}
                  </Link>
                </CardTitle>
                
                <CardDescription className="mb-4 leading-relaxed">
                  {issue.description}
                </CardDescription>
                
                {/* Progress Bar for In Progress Issues */}
                {issue.status === 'in_progress' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{issue.progress}%</span>
                    </div>
                    <Progress value={issue.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={issue.avatar || "/placeholder.svg"} alt={issue.author} />
                      <AvatarFallback className="text-xs">
                        {issue.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{issue.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{issue.createdAt}</span>
                  </div>
                  {issue.assignee && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={issue.assigneeAvatar || "/placeholder.svg"} alt={issue.assignee} />
                          <AvatarFallback className="text-xs">
                            {issue.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{issue.assignee}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {issue.labels.map((label, labelIndex) => (
                    <Badge key={labelIndex} variant="secondary" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/issues/${issue.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                  className={selectedIssue === issue.id ? 'bg-primary text-primary-foreground' : ''}
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
                      <User className="mr-2 h-4 w-4" />
                      Assign to me
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="mr-2 h-4 w-4" />
                      Edit labels
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
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
                  <span>{issue.comments} comments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{issue.reactions} reactions</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                Updated {issue.updatedAt}
              </div>
            </div>

            {selectedIssue === issue.id && (
              <div className="border-t pt-6 space-y-6 animate-slide-down">
                {/* AI Analysis */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    AI Analysis
                    <Badge variant="outline" className="ml-2 text-xs">
                      {issue.aiAnalysis.confidence}% confidence
                    </Badge>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Category</p>
                      <Badge variant="secondary">{issue.aiAnalysis.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Estimated Effort</p>
                      <Badge variant="outline">{issue.aiAnalysis.estimatedEffort}</Badge>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Suggested Labels</p>
                    <div className="flex flex-wrap gap-1">
                      {issue.aiAnalysis.suggestedLabels.map((label, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">AI Suggestions</p>
                    <ul className="space-y-2">
                      {issue.aiAnalysis.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm bg-background/50 p-3 rounded-lg border">
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {issue.aiAnalysis.relatedIssues.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Related Issues</p>
                      <div className="flex space-x-2">
                        {issue.aiAnalysis.relatedIssues.map((relatedId, i) => (
                          <Link key={i} href={`/dashboard/issues/${relatedId}`}>
                            <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                              #{relatedId}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Comment Section */}
                <div>
                  <h4 className="font-semibold mb-3">Add Comment</h4>
                  <Textarea
                    placeholder="Leave a comment..."
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
                      Close Issue
                    </Button>
                    {!issue.assignee && (
                      <Button size="sm" variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        Assign to Me
                      </Button>
                    )}
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
