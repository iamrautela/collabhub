'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Github, Upload } from 'lucide-react'

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and GitHub integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/user-profile-illustration.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Change Avatar
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself..."
              defaultValue="Full-stack developer passionate about AI and collaboration tools."
            />
          </div>
          
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>GitHub Integration</CardTitle>
          <CardDescription>
            Manage your GitHub connection and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8" />
              <div>
                <p className="font-medium">GitHub Account</p>
                <p className="text-sm text-muted-foreground">Connected as @johndoe</p>
              </div>
            </div>
            <Button variant="outline">Reconnect</Button>
          </div>
          
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✓ Read repository information</p>
              <p>✓ Read and write pull requests</p>
              <p>✓ Read and write issues</p>
              <p>✓ Read organization membership</p>
            </div>
          </div>
          
          <Button variant="destructive" size="sm">
            Disconnect GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
