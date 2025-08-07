import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, Crown, Shield, TrendingUp } from 'lucide-react'

const stats = [
  {
    title: 'Total Members',
    value: '24',
    change: '+3 this month',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    title: 'Active Contributors',
    value: '18',
    change: '+2 this week',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    title: 'Pending Invites',
    value: '3',
    change: 'Sent today',
    icon: UserPlus,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
  {
    title: 'Admins',
    value: '4',
    change: 'No changes',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  }
]

const roles = [
  { name: 'Owner', count: 1, color: 'bg-red-500' },
  { name: 'Admin', count: 3, color: 'bg-purple-500' },
  { name: 'Developer', count: 16, color: 'bg-blue-500' },
  { name: 'Reviewer', count: 4, color: 'bg-green-500' }
]

export function TeamOverview() {
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
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Distribution */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Role Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {roles.map((role, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${role.color}`} />
                <span className="text-sm font-medium">{role.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {role.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
