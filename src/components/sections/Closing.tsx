import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'

export function Closing() {
  return (
    <section id="closing" className="section-padding bg-gradient-hero relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-6 text-balance">
            「ちゃんと向き合って話せる出会い」を、<br className="hidden sm:inline" />次の一歩に。
          </h2>

          <div className="text-gray-600 text-lg leading-relaxed mb-10">
            <p className="mb-4">
              メッセージと写真だけでは分からない"人柄"を、<br className="hidden md:inline" />
              最初から対面で感じられる出会いの場を選ぶことは、<br className="hidden md:inline" />
              <span className="font-medium text-gray-800">あなたの時間と心を大切にすること</span>でもあります。
            </p>

            <p>
              アプリに少し疲れてしまった今こそ、<br className="hidden md:inline" />
              一度立ち止まって、「会って話す」出会い方を選んでみませんか。
            </p>
          </div>

          <div>
            <Button href={event.entryUrl} size="xl" pulse={true}>
              参加を申し込む
            </Button>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm">
                {event.dateDisplay}
              </span>
              <span className="bg-white/80 text-gray-600 px-4 py-2 rounded-full text-sm">
                {event.time.start}〜{event.time.end}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              ※定員になり次第締切／1人参加・婚活初心者歓迎
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  )
}
