import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GitBranch, Star, Eye, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const repositories = [
  {
    name: 'awesome-project',
    description: 'A revolutionary web application built with Next.js and AI',
    language: 'TypeScript',
    stars: 1234,
    watchers: 89,
    openPRs: 3,
    openIssues: 7,
    status: 'healthy',
    lastActivity: '2 hours ago',
    contributors: [
      { name: 'John Doe', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Jane Smith', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Bob Wilson', avatar: '/placeholder.svg?height=24&width=24' }
    ]
  },
  {
    name: 'ml-pipeline',
    description: 'Machine learning pipeline for data processing and model training',
    language: 'Python',
    stars: 567,
    watchers: 34,
    openPRs: 1,
    openIssues: 2,
    status: 'warning',
    lastActivity: '1 day ago',
    contributors: [
      { name: 'Alice Johnson', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Charlie Brown', avatar: '/placeholder.svg?height=24&width=24' }
    ]
  },
  {
    name: 'mobile-app',
    description: 'Cross-platform mobile application using React Native',
    language: 'JavaScript',
    stars: 890,
    watchers: 56,
    openPRs: 5,
    openIssues: 12,
    status: 'healthy',
    lastActivity: '30 minutes ago',
    contributors: [
      { name: 'David Lee', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Emma Davis', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Frank Miller', avatar: '/placeholder.svg?height=24&width=24' },
      { name: 'Grace Wilson', avatar: '/placeholder.svg?height=24&width=24' }
    ]
  }
]

export function RepositoryList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Repositories</CardTitle>
            <CardDescription>
              Manage and monitor your connected GitHub repositories
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/repositories">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {repositories.map((repo, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{repo.name}</h3>
                  <Badge variant="outline">{repo.language}</Badge>
                  {repo.status === 'healthy' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                <p className="text-xs text-muted-foreground">Last activity: {repo.lastActivity}</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/repositories/${repo.name}`}>
                  View Details
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{repo.watchers}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitBranch className="h-4 w-4" />
                  <span>{repo.openPRs} PRs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{repo.openIssues} issues</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {repo.contributors.slice(0, 3).map((contributor, i) => (
                  <Avatar key={i} className="h-6 w-6">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                    <AvatarFallback className="text-xs">
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {repo.contributors.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    +{repo.contributors.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
