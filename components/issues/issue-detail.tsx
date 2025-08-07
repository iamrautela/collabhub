'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, AlertCircle, CheckCircle, Clock, Brain, MessageSquare, Tag, User, Calendar, ExternalLink, Edit, MoreHorizontal, ThumbsUp, ThumbsDown, Heart, Laugh, GitBranch } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

// Mock data for the issue detail
const issueData = {
  id: 1,
  title: 'Memory leak in data processing pipeline causing application crashes',
  description: `## Bug Description
The application consumes increasing amounts of memory during large data processing tasks, eventually leading to crashes after processing 10GB+ datasets.

## Steps to Reproduce
1. Start the data processing pipeline with a dataset larger than 10GB
2. Monitor memory usage during processing
3. Observe gradual memory increase without proper cleanup
4. Application crashes after ~2 hours of processing

## Expected Behavior
Memory usage should remain stable throughout the processing, with proper cleanup after each batch.

## Actual Behavior
Memory usage continuously increases, leading to out-of-memory errors and application crashes.

## Environment
- OS: Ubuntu 20.04
- Python: 3.9.7
- Memory: 32GB RAM
- Dataset size: 15GB

## Additional Context
This issue started appearing after the recent update to the batch processing logic in v2.1.0.`,
  author: 'Bob Wilson',
  avatar: '/placeholder.svg?height=40&width=40',
  assignee: 'Alice Johnson',
  assigneeAvatar: '/placeholder.svg?height=32&width=32',
  repository: 'ml-pipeline',
  status: 'open',
  priority: 'critical',
  labels: ['bug', 'performance', 'memory', 'urgent'],
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T14:45:00Z',
  comments: 8,
  reactions: { thumbsUp: 3, thumbsDown: 0, heart: 2, laugh: 0 },
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
}

const comments = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
    content: 'I can reproduce this issue. Looking into the memory allocation patterns in the batch processing code.',
    createdAt: '2024-01-15T11:00:00Z',
    reactions: { thumbsUp: 2, heart: 1 }
  },
  {
    id: 2,
    author: 'Charlie Brown',
    avatar: '/placeholder.svg?height=32&width=32',
    content: 'I noticed similar behavior in our staging environment. The memory usage spikes around the 8GB mark.',
    createdAt: '2024-01-15T12:15:00Z',
    reactions: { thumbsUp: 1 }
  },
  {
    id: 3,
    author: 'Alice Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
    content: 'Found the issue! The database connections are not being properly closed in the error handling path. Working on a fix.',
    createdAt: '2024-01-15T14:30:00Z',
    reactions: { thumbsUp: 4, heart: 2 }
  }
]

interface IssueDetailProps {
  issueId: string
}

export function IssueDetail({ issueId }: IssueDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [showAIAnalysis, setShowAIAnalysis] = useState(true)

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
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-up">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/issues">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Issues
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(issueData.status)}>
              {getStatusIcon(issueData.status)}
              <span className="ml-1 capitalize">{issueData.status.replace('_', ' ')}</span>
            </Badge>
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(issueData.priority)}`} />
            <Badge variant="outline">{issueData.repository}</Badge>
            <span className="text-sm text-muted-foreground">#{issueData.id}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
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
                <GitBranch className="mr-2 h-4 w-4" />
                Create branch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Issue Details */}
          <Card className="animate-slide-up animation-delay-200">
            <CardHeader>
              <CardTitle className="text-2xl leading-tight">{issueData.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={issueData.avatar || "/placeholder.svg"} alt={issueData.author} />
                    <AvatarFallback className="text-xs">
                      {issueData.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{issueData.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(issueData.createdAt)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {issueData.description}
                </pre>
              </div>
              
              {/* Reactions */}
              <div className="flex items-center space-x-2 pt-4 border-t">
                <Button variant="ghost" size="sm" className="h-8">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {issueData.reactions.thumbsUp}
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Heart className="mr-1 h-4 w-4" />
                  {issueData.reactions.heart}
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  <Laugh className="mr-1 h-4 w-4" />
                  {issueData.reactions.laugh}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          {showAIAnalysis && (
            <Card className="animate-slide-up animation-delay-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    AI Analysis
                    <Badge variant="outline" className="ml-2 text-xs">
                      {issueData.aiAnalysis.confidence}% confidence
                    </Badge>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowAIAnalysis(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Category</p>
                    <Badge variant="secondary">{issueData.aiAnalysis.category}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Estimated Effort</p>
                    <Badge variant="outline">{issueData.aiAnalysis.estimatedEffort}</Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">AI Suggestions</p>
                  <ul className="space-y-2">
                    {issueData.aiAnalysis.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm bg-muted/50 p-3 rounded-lg">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {issueData.aiAnalysis.relatedIssues.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Related Issues</p>
                    <div className="flex space-x-2">
                      {issueData.aiAnalysis.relatedIssues.map((relatedId, i) => (
                        <Link key={i} href={`/dashboard/issues/${relatedId}`}>
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                            #{relatedId}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Comments */}
          <Card className="animate-slide-up animation-delay-600">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {comments.map((comment, index) => (
                <div key={comment.id} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback className="text-xs">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <div className="text-sm leading-relaxed bg-muted/30 p-3 rounded-lg">
                        {comment.content}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          {comment.reactions.thumbsUp}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Heart className="mr-1 h-3 w-3" />
                          {comment.reactions.heart}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < comments.length - 1 && <Separator />}
                </div>
              ))}
              
              {/* Add Comment */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Leave a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
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
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignee & Labels */}
          <Card className="animate-slide-up animation-delay-300">
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Assignee</p>
                {issueData.assignee ? (
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={issueData.assigneeAvatar || "/placeholder.svg"} alt={issueData.assignee} />
                      <AvatarFallback className="text-xs">
                        {issueData.assignee.split(' ').map(n
                      <AvatarFallback className="text-xs">
                        {issueData.assignee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{issueData.assignee}</span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No one assigned</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Labels</p>
                <div className="flex flex-wrap gap-1">
                  {issueData.labels.map((label, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Priority</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(issueData.priority)}`} />
                  <span className="text-sm capitalize">{issueData.priority}</span>
                </div>
              </div>
              
              {issueData.status === 'in_progress' && (
                <div>
                  <p className="text-sm font-medium mb-2">Progress</p>
                  <div className="space-y-1">
                    <Progress value={issueData.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{issueData.progress}% complete</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="animate-slide-up animation-delay-500">
            <CardHeader>
              <CardTitle className="text-sm">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Issue created</p>
                  <p className="text-xs text-muted-foreground">{formatDate(issueData.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Assigned to {issueData.assignee}</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Labels updated</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
