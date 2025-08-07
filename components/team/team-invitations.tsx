'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Mail, Clock, X, Send, UserPlus } from 'lucide-react'

const pendingInvitations = [
  {
    id: 1,
    email: 'sarah@example.com',
    role: 'Developer',
    sentAt: '2024-01-15T10:30:00Z',
    expiresAt: '2024-01-22T10:30:00Z',
    status: 'pending'
  },
  {
    id: 2,
    email: 'mike@example.com',
    role: 'Reviewer',
    sentAt: '2024-01-14T15:45:00Z',
    expiresAt: '2024-01-21T15:45:00Z',
    status: 'pending'
  },
  {
    id: 3,
    email: 'lisa@example.com',
    role: 'Developer',
    sentAt: '2024-01-13T09:20:00Z',
    expiresAt: '2024-01-20T09:20:00Z',
    status: 'expired'
  }
]

export function TeamInvitations() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleInvite = () => {
    // Handle invitation logic here
    console.log('Inviting:', { email, role })
    setEmail('')
    setRole('')
    setOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pending Invitations</CardTitle>
          <Dialog open={open} onValueChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Reviewer">Reviewer</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite} disabled={!email || !role}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingInvitations.map((invitation) => (
          <div key={invitation.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{invitation.email}</span>
                <Badge variant="outline" className="text-xs">
                  {invitation.role}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Sent {formatDate(invitation.sentAt)}</span>
                <span>•</span>
                <span>Expires {formatDate(invitation.expiresAt)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(invitation.status)}>
                {invitation.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {pendingInvitations.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No pending invitations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
