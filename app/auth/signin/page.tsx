'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, Star, Users, Zap, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const features = [
  { icon: Zap, text: "AI-powered code reviews" },
  { icon: Users, text: "Real-time collaboration" },
  { icon: Star, text: "Smart reviewer assignment" },
  { icon: Shield, text: "Enterprise-grade security" }
]

const benefits = [
  "Reduce review time by 60%",
  "Catch bugs before deployment",
  "Improve code quality",
  "Streamline team workflow"
]

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    
    // Simulate authentication process
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-muted/20">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/5 rounded-full animate-float" />
        <div className="absolute bottom-32 right-32 w-20 h-20 bg-primary/10 rounded-full animate-float animation-delay-1000" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-primary/5 rounded-full animate-float animation-delay-2000" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 py-24">
          <div className="animate-slide-up">
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">CollabHub AI</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Transform Your
              <br />
              <span className="text-primary gradient-text">GitHub Workflow</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of developers who are already using AI to supercharge 
              their code reviews and team collaboration.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 animate-slide-up"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary">Why developers love us:</p>
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 animate-slide-up"
                  style={{ animationDelay: `${(index + 5) * 200}ms` }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 animate-slide-up">
            <Button variant="ghost" asChild className="mb-6 -ml-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-2xl animate-slide-up animation-delay-200">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center animate-pulse-slow">
                  <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold mb-2">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Sign in with your GitHub account to continue your journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pb-8">
              <Button 
                className="w-full h-12 text-base font-medium relative overflow-hidden group" 
                size="lg" 
                onClick={handleGitHubSignIn}
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Connecting to GitHub...
                  </>
                ) : (
                  <>
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Continue with GitHub
                  </>
                )}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Secure OAuth Integration</span>
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Your data is protected and secure</span>
                </p>
                <p>
                  By signing in, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center animate-fade-in animation-delay-600">
            <p className="text-sm text-muted-foreground">
              Don't have a GitHub account?{' '}
              <Link 
                href="https://github.com/join" 
                target="_blank"
                className="font-medium text-primary hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
