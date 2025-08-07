import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown, Star, GitPullRequest, MessageSquare } from 'lucide-react'

const teamMembers = [
  {
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
    role: 'Senior Developer',
    prs: 28,
    reviews: 45,
    commits: 156,
    score: 95,
    trend: 'up',
    change: '+12%'
  },
  {
    name: 'John Doe',
    avatar: '/placeholder.svg?height=32&width=32',
    role: 'Full Stack Developer',
    prs: 24,
    reviews: 38,
    commits: 142,
    score: 92,
    trend: 'up',
    change: '+8%'
  },
  {
    name: 'Bob Wilson',
    avatar: '/placeholder.svg?height=32&width=32',
    role: 'Backend Developer',
    prs: 22,
    reviews: 31,
    commits: 128,
    score: 88,
    trend: 'down',
    change: '-3%'
  },
  {
    name: 'Jane Smith',
    avatar: '/placeholder.svg?height=32&width=32',
    role: 'Frontend Developer',
    prs: 26,
    reviews: 42,
    commits: 134,
    score: 91,
    trend: 'up',
    change: '+15%'
  }
]

export function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5" />
          Team Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Score: {member.score}
                </Badge>
                <div className="flex items-center space-x-1">
                  {member.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${member.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {member.change}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <GitPullRequest className="h-3 w-3" />
                  <span className="font-medium">{member.prs}</span>
                </div>
                <p className="text-xs text-muted-foreground">PRs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <MessageSquare className="h-3 w-3" />
                  <span className="font-medium">{member.reviews}</span>
                </div>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <span className="font-medium">{member.commits}</span>
                <p className="text-xs text-muted-foreground">Commits</p>
              </div>
            </div>
            
            <Progress value={member.score} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
