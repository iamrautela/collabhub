'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const activityData = [
  { name: 'Jan', prs: 65, issues: 28, commits: 145 },
  { name: 'Feb', prs: 78, issues: 35, commits: 167 },
  { name: 'Mar', prs: 92, issues: 42, commits: 189 },
  { name: 'Apr', prs: 87, issues: 38, commits: 156 },
  { name: 'May', prs: 105, issues: 45, commits: 203 },
  { name: 'Jun', prs: 118, issues: 52, commits: 234 }
]

const reviewTimeData = [
  { name: 'Week 1', avgTime: 4.2, target: 4.0 },
  { name: 'Week 2', avgTime: 3.8, target: 4.0 },
  { name: 'Week 3', avgTime: 3.5, target: 4.0 },
  { name: 'Week 4', avgTime: 3.2, target: 4.0 }
]

const languageData = [
  { name: 'TypeScript', value: 45, color: '#3178c6' },
  { name: 'JavaScript', value: 25, color: '#f7df1e' },
  { name: 'Python', value: 20, color: '#3776ab' },
  { name: 'Go', value: 10, color: '#00add8' }
]

const codeQualityData = [
  { name: 'Jan', quality: 89, bugs: 12, coverage: 78 },
  { name: 'Feb', quality: 91, bugs: 8, coverage: 82 },
  { name: 'Mar', quality: 93, bugs: 6, coverage: 85 },
  { name: 'Apr', quality: 92, bugs: 9, coverage: 83 },
  { name: 'May', quality: 94, bugs: 5, coverage: 87 },
  { name: 'Jun', quality: 96, bugs: 3, coverage: 89 }
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Development Activity Trends</CardTitle>
          <CardDescription>
            Monthly overview of pull requests, issues, and commits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="commits" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="prs" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="issues" 
                stackId="1" 
                stroke="#ffc658" 
                fill="#ffc658" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Review Time Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Review Time Performance</CardTitle>
          <CardDescription>
            Average PR review time vs target
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={reviewTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="avgTime" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ff7300" 
                strokeDasharray="5 5"
                dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Language Distribution</CardTitle>
          <CardDescription>
            Code composition across repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={languageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {languageData.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <div 
                  className="w-2 h-2 rounded-full mr-1" 
                  style={{ backgroundColor: lang.color }}
                />
                {lang.name} {lang.value}%
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Quality Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Code Quality Metrics</CardTitle>
          <CardDescription>
            Quality score, bug count, and test coverage over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={codeQualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quality" fill="#8884d8" name="Quality Score" />
              <Bar dataKey="coverage" fill="#82ca9d" name="Test Coverage" />
              <Bar dataKey="bugs" fill="#ff7300" name="Bug Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
