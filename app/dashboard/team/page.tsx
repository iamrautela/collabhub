import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { TeamOverview } from '@/components/team/team-overview'
import { TeamMembers } from '@/components/team/team-members'
import { TeamInvitations } from '@/components/team/team-invitations'
import { TeamSettings } from '@/components/team/team-settings'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="space-y-8">
          <div className="animate-slide-up">
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your team members, roles, and collaboration settings
            </p>
          </div>
          
          <div className="animate-slide-up animation-delay-200">
            <TeamOverview />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up animation-delay-400">
            <div className="lg:col-span-2">
              <TeamMembers />
            </div>
            <div className="space-y-6">
              <TeamInvitations />
              <TeamSettings />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
