import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, GitPullRequest, Bug, Users, Brain, Clock, CheckCircle } from 'lucide-react'

const metrics = [
  {
    title: 'Total Pull Requests',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: GitPullRequest,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    title: 'Issues Resolved',
    value: '892',
    change: '+8.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    title: 'Active Contributors',
    value: '24',
    change: '+2 this month',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  {
    title: 'Avg Review Time',
    value: '3.2h',
    change: '-15.2%',
    trend: 'down',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
  {
    title: 'Code Quality Score',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Brain,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950'
  },
  {
    title: 'Bug Detection Rate',
    value: '87.5%',
    change: '+5.7%',
    trend: 'up',
    icon: Bug,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950'
  }
]

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              {metric.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-600" />
              )}
              <span className="text-green-600">{metric.change}</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
