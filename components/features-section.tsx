import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Users, Mail, GitPullRequest, Bug, BarChart3, Zap, Shield, Clock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered PR Analysis',
    description: 'Get intelligent code suggestions, detect potential issues, and receive automated summaries of pull requests.',
    badge: 'AI'
  },
  {
    icon: GitPullRequest,
    title: 'Real-time PR Management',
    description: 'Collaborate on pull requests with live updates, comments, and approvals synchronized across your team.',
    badge: 'Real-time'
  },
  {
    icon: Users,
    title: 'Smart Reviewer Assignment',
    description: 'Automatically assign the best reviewers based on code expertise, availability, and contribution history.',
    badge: 'Smart'
  },
  {
    icon: Mail,
    title: 'Personalized Notifications',
    description: 'Receive tailored email updates with AI-generated summaries of changes that matter to you.',
    badge: 'Email'
  },
  {
    icon: Bug,
    title: 'Intelligent Issue Tracking',
    description: 'Track issues with AI-powered categorization, priority assignment, and automated progress updates.',
    badge: 'Issues'
  },
  {
    icon: BarChart3,
    title: 'Collaboration Analytics',
    description: 'Gain insights into team productivity, code quality trends, and collaboration patterns.',
    badge: 'Analytics'
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks like tagging, labeling, and status updates to focus on what matters.',
    badge: 'Automation'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with OAuth integration, encrypted data, and compliance-ready infrastructure.',
    badge: 'Security'
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Monitor review times, identify bottlenecks, and optimize your development workflow.',
    badge: 'Tracking'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need for better collaboration
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your GitHub workflow and enhance team productivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
