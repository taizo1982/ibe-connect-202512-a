import { SectionTitle } from '@/components/ui/SectionTitle'
import event from '@/data/event.json'
import company from '@/data/company.json'

export function EventInfo() {
  return (
    <section id="event-info" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>開催概要</SectionTitle>

          <div className="bg-bg-secondary rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium w-1/3 md:w-1/4">
                    イベント名
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    {event.title}
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    開催日時
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    {event.dateDisplay}<br />
                    {event.time.start}〜{event.time.end}
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    集合場所
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    SPARK JOY<br />
                    <span className="text-sm text-gray-500">（野洲駅徒歩1分）</span>
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    開催店舗
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    BAR / 居酒屋 / 焼肉店（3店舗）
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    対象
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    {event.target.ageMin}〜{event.target.ageMax}代の{event.target.status}男女
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    参加費
                  </th>
                  <td className="px-4 md:px-6 py-4">
                    <span className="inline-block bg-primary-blue/10 text-primary-blue-dark px-3 py-1 rounded-full text-sm font-medium mr-2 mb-1">
                      男性 {event.price.male.toLocaleString()}円
                    </span>
                    <span className="inline-block bg-primary-pink/10 text-primary-pink-dark px-3 py-1 rounded-full text-sm font-medium">
                      女性 {event.price.female.toLocaleString()}円
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      ※3店舗×1ドリンク＋料理付き
                    </p>
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    服装
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    カジュアルでOK<br />
                    <span className="text-sm text-gray-500">（清潔感のある服装）</span>
                  </td>
                </tr>
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left bg-gray-50 text-gray-600 text-sm font-medium">
                    主催
                  </th>
                  <td className="px-4 md:px-6 py-4 text-gray-800">
                    {company.name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
