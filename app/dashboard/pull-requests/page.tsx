import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { PullRequestList } from '@/components/pull-requests/pull-request-list'
import { PullRequestFilters } from '@/components/pull-requests/pull-request-filters'
import { PullRequestStats } from '@/components/pull-requests/pull-request-stats'

export default function PullRequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Pull Requests</h1>
              <p className="text-muted-foreground">
                Manage and review pull requests with AI-powered insights and real-time collaboration
              </p>
            </div>
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <PullRequestStats />
          </div>
          
          <div className="animate-slide-up animation-delay-400">
            <PullRequestFilters />
          </div>
          
          <div className="animate-slide-up animation-delay-600">
            <PullRequestList />
          </div>
        </div>
      </main>
    </div>
  )
}
