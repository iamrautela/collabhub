import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { GitPullRequest, GitMerge, Bug, MessageSquare, GitCommit } from 'lucide-react'

const activities = [
  {
    type: 'pr_opened',
    user: 'John Doe',
    avatar: '/placeholder.svg?height=20&width=20',
    action: 'opened a pull request',
    target: 'Add user authentication',
    repository: 'awesome-project',
    time: '2 minutes ago',
    icon: GitPullRequest,
    color: 'text-blue-600'
  },
  {
    type: 'pr_merged',
    user: 'Jane Smith',
    avatar: '/placeholder.svg?height=20&width=20',
    action: 'merged pull request',
    target: 'Fix responsive design issues',
    repository: 'mobile-app',
    time: '1 hour ago',
    icon: GitMerge,
    color: 'text-purple-600'
  },
  {
    type: 'issue_opened',
    user: 'Bob Wilson',
    avatar: '/placeholder.svg?height=20&width=20',
    action: 'opened an issue',
    target: 'Memory leak in data processing',
    repository: 'ml-pipeline',
    time: '3 hours ago',
    icon: Bug,
    color: 'text-red-600'
  },
  {
    type: 'comment',
    user: 'Alice Johnson',
    avatar: '/placeholder.svg?height=20&width=20',
    action: 'commented on',
    target: 'Implement caching strategy',
    repository: 'awesome-project',
    time: '5 hours ago',
    icon: MessageSquare,
    color: 'text-green-600'
  },
  {
    type: 'commit',
    user: 'Charlie Brown',
    avatar: '/placeholder.svg?height=20&width=20',
    action: 'pushed commits to',
    target: 'feature/new-dashboard',
    repository: 'mobile-app',
    time: '1 day ago',
    icon: GitCommit,
    color: 'text-orange-600'
  }
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates from your repositories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
            <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
              <activity.icon className="h-3 w-3" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                  <AvatarFallback className="text-xs">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{activity.user}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.action}{' '}
                <span className="font-medium text-foreground">{activity.target}</span>
                {' '}in{' '}
                <Badge variant="outline" className="text-xs">
                  {activity.repository}
                </Badge>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
