import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { StatsCards } from '@/components/dashboard/stats-cards'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your repositories.
            </p>
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <StatsCards />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up animation-delay-400">
            <div className="lg:col-span-2">
              <RepositoryList />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
