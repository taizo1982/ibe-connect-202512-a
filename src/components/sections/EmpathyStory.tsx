import { Button } from '@/components/ui/Button'
import event from '@/data/event.json'

export function EmpathyStory() {
  return (
    <section id="empathy" className="section-padding bg-bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-8 text-center text-balance">
            アプリでは分からない<span className="text-primary-pink">"人柄"</span>を、<br className="hidden sm:inline" />
            ちゃんと感じたいあなたへ
          </h2>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              仕事帰り、電車の中やベッドの上で、なんとなくマッチングアプリを開く。<br />
              「いいね」は付くし、メッセージも何往復かは続く。
            </p>

            <p className="mb-6">
              でも実際に会ってみると、<br />
              <span className="text-gray-800 font-medium">「写真の雰囲気と違うかも…」</span><br />
              <span className="text-gray-800 font-medium">「会話が思ったより続かないな…」</span><br />
              と感じてしまって、また最初からやり直し。
            </p>

            <p className="mb-6">
              気づけば、時間もお金もエネルギーも、少しずつ削られていくような感覚。<br />
              <span className="font-medium text-gray-800">「ちゃんと向き合って話せる出会いが、どこかにあればいいのに」</span><br />
              そんなことを、一度でも思ったことはありませんか？
            </p>

            <div className="bg-white rounded-2xl p-6 md:p-8 my-8 shadow-sm">
              <p className="text-gray-700 mb-4">
                プロフィールやメッセージのやり取りだけでは分からない、
              </p>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-pink rounded-full flex-shrink-0"></span>
                  <span>声のトーン</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-pink rounded-full flex-shrink-0"></span>
                  <span>話すテンポ</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-pink rounded-full flex-shrink-0"></span>
                  <span>一緒に過ごしたときの空気感</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                そういった<span className="text-primary-pink font-bold">"人柄"</span>まで含めて、じっくり感じられる出会いの場があれば——。
              </p>
            </div>

            <p className="text-center">
              そんな思いから生まれたのが、<br />
              野洲駅近くの人気3店舗をめぐりながら、自然体で話せる大人のバル婚活<br />
              <span className="font-display font-bold text-xl text-gray-800">「{event.title}」</span>です。
            </p>
          </div>

          <div className="text-center mt-10">
            <Button href={event.entryUrl} variant="text" size="medium">
              参加を申し込む →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
