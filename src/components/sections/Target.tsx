import { SectionTitle } from '@/components/ui/SectionTitle'
import { Check } from 'lucide-react'

const targetItems = [
  { text: 'マッチングアプリに少し疲れてきた', bold: true },
  { text: 'プロフィールやメッセージだけでは相性が分からないと感じている', boldPart: '相性が分からない' },
  { text: 'まずは"一度会って話してみたい"という感覚を大事にしたい', boldPart: '"一度会って話してみたい"' },
  { text: '真剣だけど、ガチガチの婚活パーティーは少し抵抗がある', boldPart: 'ガチガチの婚活パーティーは少し抵抗がある' },
  { text: '30〜40代の同年代と、落ち着いた雰囲気で話したい', boldPart: '30〜40代の同年代' },
]

export function Target() {
  return (
    <section id="target" className="section-padding bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>こんな方にぴったりです</SectionTitle>

          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg">
            <ul className="space-y-4">
              {targetItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-pink/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-pink" />
                  </span>
                  <span className="text-gray-800 text-lg">
                    {item.bold ? (
                      <span className="font-bold">{item.text}</span>
                    ) : item.boldPart ? (
                      <>
                        {item.text.split(item.boldPart)[0]}
                        <span className="font-bold">{item.boldPart}</span>
                        {item.text.split(item.boldPart)[1]}
                      </>
                    ) : (
                      item.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
