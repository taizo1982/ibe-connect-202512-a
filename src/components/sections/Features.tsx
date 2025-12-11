import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'
import { Users, Zap, Lock } from 'lucide-react'

const features = [
  {
    icon: Users,
    color: 'bg-primary-pink/10 text-primary-pink',
    badgeColor: 'bg-primary-pink',
    title: '少人数で、全員と1対1で話せる\nローテーション',
    description: '大人数の街コンのように「誰とも話せなかった」ということがないよう、各店舗ではローテーション制で席替えを行い、参加者全員と1対1でお話しできる時間をつくっています。',
    subDescription: '「いいね」やプロフィールでは伝わらない、話し方・間合い・リアクションまで、じっくり感じることができます。',
  },
  {
    icon: Zap,
    color: 'bg-primary-blue/10 text-primary-blue',
    badgeColor: 'bg-primary-blue',
    title: '3店舗はしごで、\n自然に距離が縮まる',
    description: '最初は少し緊張していても、BAR → 居酒屋 → 焼肉と雰囲気が変わるにつれて、話題も空気も少しずつ砕けていきます。',
    subDescription: '「最初はぎこちなかったけれど、最後には自然に笑っていた」そんな距離の縮まり方を、3店舗はしごの流れで設計しています。',
  },
  {
    icon: Lock,
    color: 'bg-accent-gold/10 text-accent-gold',
    badgeColor: 'bg-accent-gold',
    title: '連絡先交換は禁止。\nマッチングした人だけをサポート',
    description: 'パーティー中の連絡先交換はあえて禁止にしています。その代わり、「また会って話したい」と思えたお相手の番号をカードに記入いただき、マッチングが成立した方同士だけ、後日公式LINEからお見合い日程を調整。',
    subDescription: 'アプリのように"とりあえず連絡を取る"のではなく、お互いが「もう一度ちゃんと話したい」と思えた相手とのご縁だけをつなぎます。',
  },
]

export function Features() {
  return (
    <section id="features" className="section-padding bg-bg-tertiary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle>
            アプリでは分からなかった"人柄"に<br className="hidden sm:inline" />出会える3つの理由
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
                <div className="text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <span className={`inline-block ${feature.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                    POINT {index + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold text-gray-800 mb-3 whitespace-pre-line">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    {feature.subDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href={event.entryUrl} size="medium">
              参加を申し込む
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
