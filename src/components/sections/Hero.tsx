import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'
import heroBackground from '@/assets/images/back_img.png'
import { Calendar, MapPin, CheckCircle, Users } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-block bg-white/90 text-primary-pink-dark px-5 py-2 rounded-full text-sm font-medium">
              {event.dateDisplay}開催
            </span>
          </div>

          {/* Main Catchcopy */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 animate-fade-in-up text-balance drop-shadow-lg">
            アプリでは分からない<span className="text-primary-pink-light">"人柄"</span>から、<br className="hidden sm:inline" />
            ちゃんと好きになれる出会いを。
          </h1>

          {/* Subcopy */}
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up drop-shadow">
            野洲駅近くの人気3店舗をはしごしながら、<br className="hidden md:inline" />
            30〜40代同士が自然体でじっくり話せる、大人のバル婚活イベントです。
          </p>

          {/* Event Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-10 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm">
              <Calendar className="w-6 h-6 mx-auto mb-1 text-primary-pink" />
              <p className="text-xs text-gray-500">開催日</p>
              <p className="text-sm font-bold text-gray-800">2月28日（金）</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm">
              <MapPin className="w-6 h-6 mx-auto mb-1 text-primary-blue" />
              <p className="text-xs text-gray-500">エリア</p>
              <p className="text-sm font-bold text-gray-800">JR野洲駅周辺</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-accent-gold" />
              <p className="text-xs text-gray-500">形式</p>
              <p className="text-sm font-bold text-gray-800">3店舗はしご</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm">
              <Users className="w-6 h-6 mx-auto mb-1 text-primary-pink" />
              <p className="text-xs text-gray-500">対象</p>
              <p className="text-sm font-bold text-gray-800">30〜40代独身</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up">
            <span className="bg-white/90 text-primary-blue-dark px-5 py-2 rounded-full text-sm font-medium">
              男性 {event.price.male.toLocaleString()}円
            </span>
            <span className="bg-white/90 text-primary-pink-dark px-5 py-2 rounded-full text-sm font-medium">
              女性 {event.price.female.toLocaleString()}円
            </span>
          </div>

          {/* CTA */}
          <div className="animate-fade-in-up">
            <Button href={event.entryUrl} size="large" pulse={true}>
              参加を申し込む
            </Button>
            <p className="text-sm text-white/80 mt-4">
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
