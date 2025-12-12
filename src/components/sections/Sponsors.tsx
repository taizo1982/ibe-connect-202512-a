import { SectionTitle } from '@/components/ui/SectionTitle'

// 協賛ロゴをインポート
import sponsor01 from '@/assets/images/sponsors/01_undefined.webp'
import sponsor02 from '@/assets/images/sponsors/02_undefined.webp'
import sponsor03 from '@/assets/images/sponsors/03_undefined.webp'
import sponsor04 from '@/assets/images/sponsors/04_undefined.webp'
import sponsor05 from '@/assets/images/sponsors/05_undefined.webp'
import sponsor06 from '@/assets/images/sponsors/06_undefined.webp'
import sponsor07 from '@/assets/images/sponsors/07_undefined.webp'
import sponsor08 from '@/assets/images/sponsors/08_undefined.webp'
import sponsor09 from '@/assets/images/sponsors/09_undefined.webp'
import sponsor10 from '@/assets/images/sponsors/10_undefined.webp'
import sponsor11 from '@/assets/images/sponsors/11_undefined.webp'
import sponsor12 from '@/assets/images/sponsors/12_undefined.webp'
import sponsor13 from '@/assets/images/sponsors/13_undefined.webp'
import sponsor14 from '@/assets/images/sponsors/14_undefined.webp'
import sponsor15 from '@/assets/images/sponsors/15_undefined.webp'
import sponsor16 from '@/assets/images/sponsors/16_undefined.webp'
import sponsor17 from '@/assets/images/sponsors/17_undefined.webp'
import sponsor18 from '@/assets/images/sponsors/18_undefined.webp'
import sponsor19 from '@/assets/images/sponsors/19_undefined.webp'
import sponsor20 from '@/assets/images/sponsors/20_undefined.webp'

const sponsors = [
  sponsor01, sponsor02, sponsor03, sponsor04, sponsor05,
  sponsor06, sponsor07, sponsor08, sponsor09, sponsor10,
  sponsor11, sponsor12, sponsor13, sponsor14, sponsor15,
  sponsor16, sponsor17, sponsor18, sponsor19, sponsor20,
]

export function Sponsors() {
  return (
    <section id="sponsors" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>協賛企業</SectionTitle>

          {/* PC: 5列、スマホ: 3列 */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {sponsors.map((logo, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 md:p-4 flex items-center justify-center aspect-[3/2]"
              >
                <img
                  src={logo}
                  alt={`協賛企業 ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
