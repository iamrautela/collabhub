import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { IssueDetail } from '@/components/issues/issue-detail'

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <IssueDetail issueId={params.id} />
      </main>
    </div>
  )
}
