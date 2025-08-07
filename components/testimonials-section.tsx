import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Developer',
    company: 'TechCorp',
    avatar: '/woman-developer.png',
    content: 'CollabHub AI has transformed our code review process. The AI suggestions are incredibly accurate and have helped us catch issues we would have missed.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Engineering Manager',
    company: 'StartupXYZ',
    avatar: '/man-manager.png',
    content: 'The real-time collaboration features are game-changing. Our team can now review PRs together seamlessly, and the smart reviewer assignment saves us hours.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    role: 'DevOps Engineer',
    company: 'CloudScale',
    avatar: '/woman-engineer-at-work.png',
    content: 'The analytics dashboard gives us incredible insights into our development workflow. We\'ve improved our review times by 40% since using CollabHub AI.',
    rating: 5
  },
  {
    name: 'David Kim',
    role: 'Full Stack Developer',
    company: 'InnovateLab',
    avatar: '/man-developer.png',
    content: 'I love how the AI understands context and provides meaningful suggestions. It\'s like having a senior developer reviewing every PR.',
    rating: 5
  },
  {
    name: 'Lisa Wang',
    role: 'Product Manager',
    company: 'GrowthCo',
    avatar: '/woman-manager.png',
    content: 'The email notifications are perfectly tailored. I only get updates on what matters to me, and the AI summaries save me so much time.',
    rating: 5
  },
  {
    name: 'Alex Thompson',
    role: 'CTO',
    company: 'ScaleUp',
    avatar: '/executive-man.png',
    content: 'CollabHub AI has significantly improved our code quality and team collaboration. The ROI has been exceptional.',
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Loved by developers worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what teams are saying about their experience with CollabHub AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
