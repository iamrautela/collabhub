import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const stats = [
  {
    title: 'Open Issues',
    value: '23',
    change: '+3 this week',
    trend: 'up',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950'
  },
  {
    title: 'In Progress',
    value: '8',
    change: '+2 this week',
    trend: 'up',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950'
  },
  {
    title: 'Closed This Week',
    value: '12',
    change: '+4 from last week',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    title: 'Average Resolution',
    value: '2.3 days',
    change: '-0.5 days',
    trend: 'down',
    icon: TrendingDown,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  }
]

const priorities = [
  { label: 'Critical', count: 3, color: 'bg-red-500' },
  { label: 'High', count: 7, color: 'bg-orange-500' },
  { label: 'Medium', count: 11, color: 'bg-yellow-500' },
  { label: 'Low', count: 2, color: 'bg-green-500' }
]

export function IssueStats() {
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
                ) : stat.trend === 'down' ? (
                  <TrendingDown className="h-3 w-3 text-green-600" />
                ) : (
                  <Minus className="h-3 w-3 text-gray-600" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-green-600' : 'text-gray-600'}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Breakdown */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Priority Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {priorities.map((priority, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                <span className="text-sm font-medium">{priority.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {priority.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
