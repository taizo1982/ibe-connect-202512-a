import company from '@/data/company.json'
import logoWhite from '@/assets/images/logo-white.webp'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-8">
            <a href={company.url}>
              <img src={logoWhite} alt={company.name} className="h-12" />
            </a>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href={company.links.about} className="text-gray-400 hover:text-white transition-colors">
                団体概要
              </a>
              <a href={company.links.party} className="text-gray-400 hover:text-white transition-colors">
                イベント一覧
              </a>
              <a href={company.links.faq} className="text-gray-400 hover:text-white transition-colors">
                よくある質問
              </a>
              <a href={company.links.contact} className="text-gray-400 hover:text-white transition-colors">
                お問い合わせ
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <a href={company.links.privacy} className="hover:text-gray-400 transition-colors">
                プライバシーポリシー
              </a>
              <a href={company.links.terms} className="hover:text-gray-400 transition-colors">
                利用規約
              </a>
              <a href={company.links.tokusyo} className="hover:text-gray-400 transition-colors">
                特定商取引法
              </a>
            </div>

            <p className="text-xs text-gray-500">
              &copy; {company.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
