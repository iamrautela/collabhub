import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GitPullRequest, Bug, Users, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Open Pull Requests',
    value: '12',
    change: '+2 from last week',
    icon: GitPullRequest,
    color: 'text-blue-600',
    trend: 'up'
  },
  {
    title: 'Active Issues',
    value: '8',
    change: '-3 from last week',
    icon: Bug,
    color: 'text-red-600',
    trend: 'down'
  },
  {
    title: 'Team Members',
    value: '24',
    change: '+1 new member',
    icon: Users,
    color: 'text-green-600',
    trend: 'up'
  },
  {
    title: 'Review Score',
    value: '94%',
    change: '+5% improvement',
    icon: TrendingUp,
    color: 'text-purple-600',
    trend: 'up'
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
