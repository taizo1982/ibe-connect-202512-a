import { SectionTitle } from '@/components/ui/SectionTitle'
import company from '@/data/company.json'
import { Building2, Ban, Users, MessageCircle } from 'lucide-react'

const trustItems = [
  {
    icon: Building2,
    color: 'bg-primary-blue/10 text-primary-blue',
    title: `主催：${company.name}`,
    description: '非営利団体による運営で結婚相談所への勧誘行為等はありませんので、安心してご参加いただけます',
  },
  {
    icon: Ban,
    color: 'bg-red-50 text-red-500',
    title: '営業・勧誘目的の参加はお断り',
    description: '真剣な出会いを求める方だけが参加できる安心の環境です',
  },
  {
    icon: Users,
    color: 'bg-accent-gold/10 text-accent-gold',
    title: 'スタッフが受付〜解散までサポート',
    description: '席替え・時間管理など、スタッフがしっかりサポートしますので初参加でも安心です',
  },
  {
    icon: MessageCircle,
    color: 'bg-primary-pink/10 text-primary-pink',
    title: 'マッチング後は公式LINEでフォロー',
    description: 'お見合い日程・場所の調整から交際後のフォローアップまで丁寧にサポートします',
  },
]

export function Trust() {
  return (
    <section id="trust" className="section-padding bg-bg-tertiary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>安心して参加できる運営体制</SectionTitle>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {trustItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
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
