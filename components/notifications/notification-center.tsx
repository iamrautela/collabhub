'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, Check, X, GitPullRequest, Bug, MessageSquare, Users, Star, AlertCircle } from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'pr_review',
    title: 'Review requested on "Add authentication system"',
    description: 'John Doe requested your review on pull request #123',
    author: 'John Doe',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '2 minutes ago',
    read: false,
    icon: GitPullRequest,
    color: 'text-blue-600',
    action: 'review'
  },
  {
    id: 2,
    type: 'issue_assigned',
    title: 'Issue assigned to you',
    description: 'Memory leak in data processing pipeline #45',
    author: 'Alice Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '15 minutes ago',
    read: false,
    icon: Bug,
    color: 'text-red-600',
    action: 'view'
  },
  {
    id: 3,
    type: 'comment',
    title: 'New comment on your pull request',
    description: 'Bob Wilson commented on "Fix responsive design issues"',
    author: 'Bob Wilson',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '1 hour ago',
    read: true,
    icon: MessageSquare,
    color: 'text-green-600',
    action: 'reply'
  },
  {
    id: 4,
    type: 'team_invite',
    title: 'Team invitation',
    description: 'You have been invited to join the "Frontend Team"',
    author: 'Emma Davis',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '2 hours ago',
    read: false,
    icon: Users,
    color: 'text-purple-600',
    action: 'accept'
  },
  {
    id: 5,
    type: 'pr_approved',
    title: 'Pull request approved',
    description: 'Your pull request "Optimize database queries" was approved',
    author: 'Charlie Brown',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '3 hours ago',
    read: true,
    icon: Check,
    color: 'text-green-600',
    action: 'merge'
  },
  {
    id: 6,
    type: 'repo_starred',
    title: 'Repository starred',
    description: 'Your repository "awesome-project" was starred by 5 users',
    author: 'System',
    avatar: '/placeholder.svg?height=32&width=32',
    timestamp: '1 day ago',
    read: true,
    icon: Star,
    color: 'text-yellow-600',
    action: 'view'
  }
]

export function NotificationCenter() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [filter, setFilter] = useState('all')

  const unreadCount = notificationList.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const removeNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id))
  }

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === 'unread') return !notification.read
    if (filter === 'mentions') return notification.type === 'comment'
    return true
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="mr-1 h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 mt-4">
          {['all', 'unread', 'mentions'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs capitalize"
            >
              {filterType}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-muted/30 transition-colors ${
                    !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.author} />
                        <AvatarFallback className="text-xs">
                          {notification.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-background`}>
                        <notification.icon className={`h-3 w-3 ${notification.color}`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-tight">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="text-xs h-6">
                          {notification.action === 'review' && 'Review PR'}
                          {notification.action === 'view' && 'View'}
                          {notification.action === 'reply' && 'Reply'}
                          {notification.action === 'accept' && 'Accept'}
                          {notification.action === 'merge' && 'Merge'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
