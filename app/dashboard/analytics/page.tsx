import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { AnalyticsOverview } from '@/components/analytics/analytics-overview'
import { AnalyticsCharts } from '@/components/analytics/analytics-charts'
import { TeamPerformance } from '@/components/analytics/team-performance'
import { RepositoryInsights } from '@/components/analytics/repository-insights'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your team's productivity and code quality
            </p>
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <AnalyticsOverview />
          </div>
          
          <div className="animate-slide-up animation-delay-400">
            <AnalyticsCharts />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up animation-delay-600">
            <TeamPerformance />
            <RepositoryInsights />
          </div>
        </div>
      </main>
    </div>
  )
}
