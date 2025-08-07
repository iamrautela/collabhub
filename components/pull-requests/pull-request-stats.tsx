import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GitPullRequest, GitMerge, Clock, TrendingUp, TrendingDown, Users, Brain, CheckCircle } from 'lucide-react'

const stats = [
  {
    title: 'Open PRs',
    value: '18',
    change: '+3 this week',
    trend: 'up',
    icon: GitPullRequest,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    title: 'Merged This Week',
    value: '24',
    change: '+8 from last week',
    trend: 'up',
    icon: GitMerge,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  {
    title: 'Avg Review Time',
    value: '4.2h',
    change: '-1.3h improvement',
    trend: 'down',
    icon: Clock,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    title: 'AI Reviews',
    value: '156',
    change: '+45 this week',
    trend: 'up',
    icon: Brain,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  }
]

const reviewStats = [
  { label: 'Approved', count: 12, color: 'bg-green-500' },
  { label: 'Changes Requested', count: 4, color: 'bg-red-500' },
  { label: 'Pending Review', count: 8, color: 'bg-yellow-500' },
  { label: 'Draft', count: 3, color: 'bg-gray-500' }
]

export function PullRequestStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Main Stats */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600" />
                )}
                <span className="text-green-600">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Status Breakdown */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Review Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reviewStats.map((status, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="text-sm font-medium">{status.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {status.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
