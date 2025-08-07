import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Zap, Users, Brain, Star } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full animate-float" />
      <div className="absolute bottom-32 right-32 w-20 h-20 bg-primary/10 rounded-full animate-float animation-delay-1000" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-primary/5 rounded-full animate-float animation-delay-2000" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            <Zap className="mr-2 h-3 w-3" />
            AI-Powered GitHub Collaboration
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-slide-up">
            Supercharge Your{' '}
            <span className="text-primary gradient-text">GitHub</span>{' '}
            Collaboration
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Transform your pull request reviews with AI-powered insights, real-time collaboration, 
            and intelligent team coordination. Built for modern development teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animation-delay-400">
            <Button size="lg" className="group" asChild>
              <Link href="/auth/signin">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Start with GitHub
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-600">
            <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Reviews</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get intelligent suggestions and automated code analysis
              </p>
            </div>
            
            <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Collaboration</h3>
              <p className="text-sm text-muted-foreground text-center">
                Collaborate seamlessly with live updates and notifications
              </p>
            </div>
            
            <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Automation</h3>
              <p className="text-sm text-muted-foreground text-center">
                Automate reviewer assignments and workflow optimization
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in animation-delay-800">
            <p className="text-sm text-muted-foreground mb-4">Trusted by developers at</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.9/5 rating</span>
              </div>
              <div className="text-sm font-medium">10,000+ developers</div>
              <div className="text-sm font-medium">500+ teams</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
