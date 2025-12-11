import { SectionTitle } from '@/components/ui/SectionTitle'
import event from '@/data/event.json'
import sparkJoyImg from '@/assets/images/spark-joy.webp'
import waenImg from '@/assets/images/waen.jpg'
import hanabiImg from '@/assets/images/hanabi.webp'

const venueImages = [sparkJoyImg, waenImg, hanabiImg]
const venueColors = ['bg-primary-pink/10 text-primary-pink', 'bg-primary-blue/10 text-primary-blue', 'bg-accent-gold/10 text-accent-gold']

export function Concept() {
  return (
    <section id="concept" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>
            最初から「会って話す」ことにフォーカスした、<br className="hidden md:inline" />大人のバル婚活
          </SectionTitle>

          <div className="text-center mb-10">
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              このイベントは、マッチングアプリのように「メッセージを重ねてからやっと会う」のではなく、
              <span className="font-bold text-gray-800">はじめから"会って話すこと"にフォーカス</span>した出会いの場です。
            </p>
          </div>

          {/* 3店舗のカード */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {event.venues.map((venue, index) => (
              <a
                key={venue.name}
                href={venue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={venueImages[index]}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block ${venueColors[index]} text-xs font-bold px-2 py-1 rounded-full`}>
                      {index + 1}軒目
                    </span>
                    <span className="text-xs text-gray-500">{venue.type}</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-800 mb-1">{venue.name}</h3>
                  <p className="text-sm text-gray-600">{venue.menu}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              ※店舗を巡る順番はグループにより異なります
            </p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              お店の雰囲気が変わるたびに、会話の空気も自然と柔らかくなり、<br className="hidden md:inline" />
              <span className="font-medium text-gray-800">プロフィールでは分からない"人柄"に触れやすい時間</span>が流れていきます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
