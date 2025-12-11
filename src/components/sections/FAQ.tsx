import { useState } from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import event from '@/data/event.json'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>よくあるご質問</SectionTitle>

          <div className="space-y-4">
            {event.faq.map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  className="w-full px-5 md:px-6 py-4 text-left flex items-center justify-between gap-4"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-pink rounded-full flex items-center justify-center text-white text-xs font-bold">
                      Q
                    </span>
                    <span className="font-medium text-gray-800">{item.question}</span>
                  </span>
                  <span className={cn(
                    'flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </span>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-5 md:px-6 pb-4">
                    <div className="flex items-start gap-3 pl-9">
                      <p className="text-gray-600">{item.answer}</p>
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
