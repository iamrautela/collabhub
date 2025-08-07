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
import { Search, Filter, X, SlidersHorizontal, GitPullRequest, User, Calendar, Tag } from 'lucide-react'

const activeFilters = [
  { type: 'status', label: 'Status: Open', value: 'open' },
  { type: 'author', label: 'Author: John Doe', value: 'john' },
  { type: 'repository', label: 'Repo: awesome-project', value: 'awesome-project' }
]

export function PullRequestFilters() {
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
              placeholder="Search pull requests by title, description, or branch..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="changes_requested">Changes Requested</SelectItem>
                <SelectItem value="merged">Merged</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-repos">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Repository" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-repos">All Repos</SelectItem>
                <SelectItem value="awesome-project">awesome-project</SelectItem>
                <SelectItem value="ml-pipeline">ml-pipeline</SelectItem>
                <SelectItem value="mobile-app">mobile-app</SelectItem>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg animate-slide-down">
            <Select defaultValue="all-authors">
              <SelectTrigger>
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-authors">All Authors</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="alice">Alice Johnson</SelectItem>
                <SelectItem value="bob">Bob Wilson</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-reviewers">
              <SelectTrigger>
                <SelectValue placeholder="Reviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-reviewers">All Reviewers</SelectItem>
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
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="bugfix">Bug Fix</SelectItem>
                <SelectItem value="hotfix">Hotfix</SelectItem>
                <SelectItem value="refactor">Refactor</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-time">
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
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
            My PRs
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <GitPullRequest className="mr-1 h-3 w-3" />
            Needs Review
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            Created Today
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-xs">
            <Tag className="mr-1 h-3 w-3" />
            Ready to Merge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
