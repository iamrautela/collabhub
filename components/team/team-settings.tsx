import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Shield, Users, Bell, Lock } from 'lucide-react'

const teamSettings = [
  {
    id: 'auto-assign',
    label: 'Auto-assign reviewers',
    description: 'Automatically assign reviewers to new pull requests',
    enabled: true
  },
  {
    id: 'require-reviews',
    label: 'Require code reviews',
    description: 'All pull requests must be reviewed before merging',
    enabled: true
  },
  {
    id: 'notifications',
    label: 'Team notifications',
    description: 'Send notifications for team activities',
    enabled: false
  },
  {
    id: 'public-repos',
    label: 'Allow public repositories',
    description: 'Team members can create public repositories',
    enabled: true
  }
]

export function TeamSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Team Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {teamSettings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between space-x-3">
            <div className="flex-1">
              <Label htmlFor={setting.id} className="text-sm font-medium">
                {setting.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                {setting.description}
              </p>
            </div>
            <Switch id={setting.id} defaultChecked={setting.enabled} />
          </div>
        ))}
        
        <div className="pt-4 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Shield className="mr-2 h-4 w-4" />
            Security Settings
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Access Control
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
