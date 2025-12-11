import { SectionTitle } from '@/components/ui/SectionTitle'
import event from '@/data/event.json'
import { Quote, User } from 'lucide-react'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>参加者の声</SectionTitle>

          <div className="grid md:grid-cols-3 gap-6">
            {event.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-bg-secondary rounded-2xl p-6 relative">
                {/* Quote icon */}
                <div className="absolute -top-3 left-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-primary-pink rounded-full">
                    <Quote className="w-5 h-5 text-white" />
                  </span>
                </div>

                <div className="pt-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      testimonial.gender === '女性' ? 'bg-primary-pink/20' : 'bg-primary-blue/20'
                    }`}>
                      <User className={`w-5 h-5 ${
                        testimonial.gender === '女性' ? 'text-primary-pink' : 'text-primary-blue'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{testimonial.age}・{testimonial.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
