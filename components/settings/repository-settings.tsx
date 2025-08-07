'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Github, Plus, Trash2, Settings } from 'lucide-react'

const connectedRepos = [
  {
    name: 'awesome-project',
    fullName: 'johndoe/awesome-project',
    private: false,
    aiEnabled: true,
    notifications: true,
    lastSync: '2 minutes ago'
  },
  {
    name: 'ml-pipeline',
    fullName: 'johndoe/ml-pipeline',
    private: true,
    aiEnabled: true,
    notifications: false,
    lastSync: '1 hour ago'
  },
  {
    name: 'mobile-app',
    fullName: 'company/mobile-app',
    private: false,
    aiEnabled: false,
    notifications: true,
    lastSync: '30 minutes ago'
  }
]

export function RepositorySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Repositories</CardTitle>
              <CardDescription>
                Manage repositories integrated with CollabHub AI
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Connect Repository
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedRepos.map((repo, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Github className="h-5 w-5" />
                  <div>
                    <p className="font-medium">{repo.name}</p>
                    <p className="text-sm text-muted-foreground">{repo.fullName}</p>
                  </div>
                  {repo.private && (
                    <Badge variant="secondary">Private</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`ai-${index}`}>AI Features</Label>
                  <Switch id={`ai-${index}`} defaultChecked={repo.aiEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor={`notifications-${index}`}>Notifications</Label>
                  <Switch id={`notifications-${index}`} defaultChecked={repo.notifications} />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-3">
                Last synced: {repo.lastSync}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Repository Settings</CardTitle>
          <CardDescription>
            Default settings for newly connected repositories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable AI Features by Default</Label>
              <p className="text-sm text-muted-foreground">
                Automatically enable AI suggestions for new repositories
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-sync Repository Data</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync PRs, issues, and commits
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Real-time Updates</Label>
              <p className="text-sm text-muted-foreground">
                Receive live updates for repository activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
