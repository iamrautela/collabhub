'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, X, SlidersHorizontal, Calendar, User, Tag } from 'lucide-react'

const activeFilters = [
  { type: 'status', label: 'Status: Open', value: 'open' },
  { type: 'priority', label: 'Priority: High', value: 'high' },
  { type: 'repository', label: 'Repo: awesome-project', value: 'awesome-project' }
]

export function IssueFilters() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Main Filter Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues by title, description, or labels..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select defaultValue="all-status">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-priority">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-priority">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={showAdvanced ? 'bg-muted' : ''}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg animate-slide-down">
            <Select defaultValue="all-repos">
              <SelectTrigger>
                <SelectValue placeholder="Repository" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-repos">All Repositories</SelectItem>
                <SelectItem value="awesome-project">awesome-project</SelectItem>
                <SelectItem value="ml-pipeline">ml-pipeline</SelectItem>
                <SelectItem value="mobile-app">mobile-app</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-assignees">
              <SelectTrigger>
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-assignees">All Assignees</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="alice">Alice Johnson</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-labels">
              <SelectTrigger>
                <SelectValue placeholder="Labels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-labels">All Labels</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="enhancement">Enhancement</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Active filters:
            </span>
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center space-x-1 hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
              >
                <span>{filter.label}</span>
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="text-xs h-6">
              Clear all
            </Button>
          </div>
        )}

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Quick filters:</span>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <User className="mr-1 h-3 w-3" />
            Assigned to me
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            Created this week
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Tag className="mr-1 h-3 w-3" />
            High priority
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <AlertCircle className="mr-1 h-3 w-3" />
            Needs attention
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
