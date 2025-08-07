import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { IssueList } from '@/components/issues/issue-list'
import { IssueFilters } from '@/components/issues/issue-filters'
import { CreateIssueDialog } from '@/components/issues/create-issue-dialog'
import { IssueStats } from '@/components/issues/issue-stats'

export default function IssuesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Issues</h1>
              <p className="text-muted-foreground">
                Track and manage issues across your repositories with AI-powered insights
              </p>
            </div>
            <CreateIssueDialog />
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <IssueStats />
          </div>
          
          <div className="animate-slide-up animation-delay-400">
            <IssueFilters />
          </div>
          
          <div className="animate-slide-up animation-delay-600">
            <IssueList />
          </div>
        </div>
      </main>
    </div>
  )
}
