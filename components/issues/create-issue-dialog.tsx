'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Brain, Sparkles, X, Tag, AlertCircle } from 'lucide-react'

const templates = [
  {
    name: 'Bug Report',
    icon: AlertCircle,
    description: 'Report a bug or issue',
    template: {
      title: '',
      body: `## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear and concise description of what you expected to happen.

## Actual Behavior
A clear and concise description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

## Additional Context
Add any other context about the problem here.`
    }
  },
  {
    name: 'Feature Request',
    icon: Sparkles,
    description: 'Suggest a new feature',
    template: {
      title: '',
      body: `## Feature Description
A clear and concise description of what you want to happen.

## Problem Statement
Is your feature request related to a problem? Please describe.

## Proposed Solution
Describe the solution you'd like

## Alternatives Considered
Describe any alternative solutions or features you've considered.

## Additional Context
Add any other context or screenshots about the feature request here.`
    }
  }
]

export function CreateIssueDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [suggestedLabels, setSuggestedLabels] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const generateAISuggestion = async () => {
    if (!title && !description) return
    
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      if (title.toLowerCase().includes('bug') || title.toLowerCase().includes('error') || title.toLowerCase().includes('crash')) {
        setAiSuggestion('This appears to be a bug report. Consider adding steps to reproduce, expected vs actual behavior, and environment details.')
        setSuggestedLabels(['bug', 'needs-investigation'])
      } else if (title.toLowerCase().includes('feature') || title.toLowerCase().includes('add') || title.toLowerCase().includes('implement')) {
        setAiSuggestion('This looks like a feature request. Include user stories, acceptance criteria, and mockups if applicable.')
        setSuggestedLabels(['enhancement', 'feature-request'])
      } else if (title.toLowerCase().includes('performance') || title.toLowerCase().includes('slow') || title.toLowerCase().includes('memory')) {
        setAiSuggestion('This seems to be a performance issue. Include performance metrics, profiling data, and system specifications.')
        setSuggestedLabels(['performance', 'optimization'])
      } else {
        setAiSuggestion('Add relevant labels, assign appropriate team members, and set priority level based on impact.')
        setSuggestedLabels(['needs-triage'])
      }
      setIsAnalyzing(false)
    }, 1500)
  }

  const applyTemplate = (template: typeof templates[0]) => {
    setTitle(template.template.title)
    setDescription(template.template.body)
    setSelectedTemplate(template.name)
  }

  const removeSuggestedLabel = (labelToRemove: string) => {
    setSuggestedLabels(prev => prev.filter(label => label !== labelToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover-lift">
          <Plus className="mr-2 h-4 w-4" />
          Create Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
          <DialogDescription>
            Create a new issue to track bugs, features, or tasks with AI-powered assistance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Templates */}
          {!selectedTemplate && (
            <div>
              <Label className="text-base font-semibold">Choose a Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {templates.map((template, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover-lift"
                    onClick={() => applyTemplate(template)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <template.icon className="mr-2 h-4 w-4" />
                        {template.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setSelectedTemplate('custom')}
              >
                Start from scratch
              </Button>
            </div>
          )}

          {(selectedTemplate || title || description) && (
            <>
              {/* Repository Selection */}
              <div className="grid gap-2">
                <Label htmlFor="repository">Repository *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repository" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awesome-project">awesome-project</SelectItem>
                    <SelectItem value="ml-pipeline">ml-pipeline</SelectItem>
                    <SelectItem value="mobile-app">mobile-app</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of the issue"
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the issue"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              {/* Priority and Assignee */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* AI Suggestions */}
              {(title || description) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">AI Assistant</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={generateAISuggestion}
                      disabled={isAnalyzing}
                      className="hover-lift"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      {isAnalyzing ? 'Analyzing...' : 'Get AI Help'}
                    </Button>
                  </div>
                  
                  {aiSuggestion && (
                    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                          <Brain className="h-5 w-5 text-primary mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm">{aiSuggestion}</p>
                            {suggestedLabels.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs font-medium mb-2">Suggested Labels:</p>
                                <div className="flex flex-wrap gap-1">
                                  {suggestedLabels.map((label, i) => (
                                    <Badge 
                                      key={i} 
                                      variant="secondary" 
                                      className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                      onClick={() => removeSuggestedLabel(label)}
                                    >
                                      <Tag className="mr-1 h-3 w-3" />
                                      {label}
                                      <X className="ml-1 h-3 w-3" />
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={() => setOpen(false)}
            disabled={!title || !description}
            className="hover-lift"
          >
            Create Issue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
