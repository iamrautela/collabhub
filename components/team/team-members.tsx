'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreHorizontal, Crown, Shield, User, Mail, Calendar, GitPullRequest, MessageSquare, UserMinus, Settings } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Owner',
    status: 'active',
    joinedAt: '2023-01-15',
    lastActive: '2 hours ago',
    stats: {
      prs: 45,
      reviews: 89,
      commits: 234
    },
    permissions: ['admin', 'write', 'read']
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Admin',
    status: 'active',
    joinedAt: '2023-02-20',
    lastActive: '1 hour ago',
    stats: {
      prs: 38,
      reviews: 67,
      commits: 189
    },
    permissions: ['write', 'read']
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Developer',
    status: 'active',
    joinedAt: '2023-03-10',
    lastActive: '30 minutes ago',
    stats: {
      prs: 32,
      reviews: 45,
      commits: 156
    },
    permissions: ['write', 'read']
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Developer',
    status: 'active',
    joinedAt: '2023-03-25',
    lastActive: '1 day ago',
    stats: {
      prs: 28,
      reviews: 52,
      commits: 142
    },
    permissions: ['write', 'read']
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Reviewer',
    status: 'inactive',
    joinedAt: '2023-04-05',
    lastActive: '1 week ago',
    stats: {
      prs: 12,
      reviews: 34,
      commits: 78
    },
    permissions: ['read']
  },
  {
    id: 6,
    name: 'Emma Davis',
    email: 'emma@company.com',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Developer',
    status: 'active',
    joinedAt: '2023-04-20',
    lastActive: '3 hours ago',
    stats: {
      prs: 24,
      reviews: 41,
      commits: 123
    },
    permissions: ['write', 'read']
  }
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'Owner': return <Crown className="h-4 w-4 text-red-600" />
    case 'Admin': return <Shield className="h-4 w-4 text-purple-600" />
    default: return <User className="h-4 w-4 text-blue-600" />
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Owner': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'Admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    case 'Developer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'Reviewer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

const getStatusColor = (status: string) => {
  return status === 'active' 
    ? 'bg-green-500' 
    : 'bg-gray-400'
}

export function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Owner">Owner</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Reviewer">Reviewer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{member.name}</h3>
                    <Badge className={getRoleColor(member.role)}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{member.role}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{member.email}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    <span>Last active {member.lastActive}</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Role
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <UserMinus className="mr-2 h-4 w-4" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Member Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <GitPullRequest className="h-3 w-3 text-blue-600" />
                  <span className="font-medium">{member.stats.prs}</span>
                </div>
                <p className="text-xs text-muted-foreground">Pull Requests</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <MessageSquare className="h-3 w-3 text-green-600" />
                  <span className="font-medium">{member.stats.reviews}</span>
                </div>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <span className="font-medium">{member.stats.commits}</span>
                <p className="text-xs text-muted-foreground">Commits</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
