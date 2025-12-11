import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'

export function Schedule() {
  return (
    <section id="schedule" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>当日の流れ</SectionTitle>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-pink via-primary-blue to-accent-gold md:-translate-x-1/2"></div>

            <div className="space-y-8">
              {event.schedule.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Time bubble */}
                  <div
                    className={`absolute left-0 md:left-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 md:-translate-x-1/2 ${
                      index < 2 ? 'bg-primary-pink' : index < 4 ? 'bg-primary-blue' : 'bg-accent-gold'
                    }`}
                  >
                    {item.time}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <h3 className="font-display font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.detail}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-8">
              ※各店舗で1ドリンク＋料理付き／スタッフが席替え・時間管理をサポート
            </p>

            <Button href={event.entryUrl} size="medium">
              参加を申し込む
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
