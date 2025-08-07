import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { GitBranch, Star, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

const repositories = [
  {
    name: 'awesome-project',
    language: 'TypeScript',
    stars: 1234,
    watchers: 89,
    health: 95,
    issues: { open: 8, closed: 156 },
    prs: { open: 3, merged: 89 },
    activity: 'high',
    lastCommit: '2 hours ago'
  },
  {
    name: 'ml-pipeline',
    language: 'Python',
    stars: 567,
    watchers: 34,
    health: 88,
    issues: { open: 12, closed: 98 },
    prs: { open: 5, merged: 67 },
    activity: 'medium',
    lastCommit: '1 day ago'
  },
  {
    name: 'mobile-app',
    language: 'JavaScript',
    stars: 890,
    watchers: 56,
    health: 92,
    issues: { open: 6, closed: 134 },
    prs: { open: 2, merged: 78 },
    activity: 'high',
    lastCommit: '4 hours ago'
  },
  {
    name: 'api-gateway',
    language: 'Go',
    stars: 345,
    watchers: 23,
    health: 85,
    issues: { open: 15, closed: 67 },
    prs: { open: 7, merged: 45 },
    activity: 'low',
    lastCommit: '3 days ago'
  }
]

const getActivityColor = (activity: string) => {
  switch (activity) {
    case 'high': return 'bg-green-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

const getHealthColor = (health: number) => {
  if (health >= 90) return 'text-green-600'
  if (health >= 80) return 'text-yellow-600'
  return 'text-red-600'
}

export function RepositoryInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="mr-2 h-5 w-5" />
          Repository Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {repositories.map((repo, index) => (
          <div key={index} className="space-y-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{repo.name}</h3>
                <Badge variant="outline" className="text-xs">{repo.language}</Badge>
                <div className={`w-2 h-2 rounded-full ${getActivityColor(repo.activity)}`} 
                     title={`${repo.activity} activity`} />
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{repo.watchers}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <AlertTriangle className="h-3 w-3 text-red-500" />
                  <span className="font-medium">{repo.issues.open}</span>
                </div>
                <p className="text-xs text-muted-foreground">Open Issues</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <GitBranch className="h-3 w-3 text-blue-500" />
                  <span className="font-medium">{repo.prs.open}</span>
                </div>
                <p className="text-xs text-muted-foreground">Open PRs</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="font-medium">{repo.prs.merged}</span>
                </div>
                <p className="text-xs text-muted-foreground">Merged</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Repository Health</span>
                <span className={`font-medium ${getHealthColor(repo.health)}`}>
                  {repo.health}%
                </span>
              </div>
              <Progress value={repo.health} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Last commit: {repo.lastCommit}</span>
              </div>
              <Badge variant="outline" className="text-xs capitalize">
                {repo.activity} activity
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
