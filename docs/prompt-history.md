# プロンプト履歴と実装メモ

過去に受けた主なリクエストと、それに対して追加した実装／運用ルールをまとめています。新しい LP を構築する際は、ここに記載されたナレッジを参照して同じクオリティを再現してください。

## 1. Figma デザイン変更関連

| 要望 | 対応内容 / 参照箇所 |
| --- | --- |
| 「Figma のデザインを変えた時に簡単にデザイン変更ができるようにする」 | Tailwind v4 のデザイントークンを `src/index.css` で一元管理。各セクションは `src/components/event/*` に分割済みのため、Figma のレイヤー単位でコンポーネントを差し替えれば良い。Hero バリエーションは `EventHero` と `HeroSection` の 2 パターンを参照。 |
| 「Figma Make から TypeScript コードを貼り付けたい」 | Figma Make の出力は TSX なので、そのまま `src/components` 配下へ追加し、既存の UI コンポーネント（`Button` など）に合わせて微調整する。README の複製手順 Step2 にも記載。 |
| 「LP 全体で同じ CTA を計測したい」 | CTA ボタンは `trackParticipateConversion` を渡した `<Button asChild>` で統一。CTA を追加する場合は `PARTY_DETAIL_URL` とトラッキング関数を流用する。 |
| 「画像のフォールバックに JPG を使いたい」 | 非透過画像は `*.jpg` を最終フォールバックに変更済み。`scripts/optimize-images.mjs` が自動で AVIF/WebP を再生成するため、新しい画像は `src/assets` に配置して `npm run optimize:images` を実行する。 |

## 2. SEO ＆ スキーマ関連

| 要望 | 対応内容 / 参照箇所 |
| --- | --- |
| 「OGP を追加し env で管理したい」 | `index.html` の `<meta property="og:*>` と `<meta name="twitter:*">` は `__PLACEHOLDER__` 形式で埋め込まれ、`scripts/inject-analytics-html.mjs` が `.env` から値を挿入。未設定の値はタグごと除去される。 |
| 「スキーマの出力方法を整理したい」 | `index.html` で JSON-LD を直書きし、イベント情報（開催日／場所／オファーなど）を網羅。LP ごとに差し替える際はここだけで完結する。 |
| 「SEO 計測タグを環境変数で制御したい」 | `.env.example` に GA・Ads・Meta Pixel 変数を追加。`scripts/inject-analytics-html.mjs` が本番ビルド時に head へ挿入し、Dev サーバーでは `import.meta.env` から直接読み込む。 |

## 3. PageSpeed Insights 対策

| 要望 | 対応内容 / 参照箇所 |
| --- | --- |
| 「render-blocking CSS を解消したい」 | `scripts/inject-analytics-html.mjs` が `build/assets/index-*.css` を `index.html` にインライン化。外部 `<link rel="stylesheet">` は生成されない。 |
| 「fetchpriority=high を設定したい」 | LCP 候補のヒーロー画像 (`EventHero`, `HeroSection`) に `loading="eager"` と `fetchpriority="high"` を付与。 |
| 「画像配信を改善したい」 | `scripts/optimize-images.mjs` が PNG/JPG をスキャンして AVIF/WebP/JPG を生成。`PainZone` など LCP 以外の画像には `loading="lazy"` と `sizes` を設定し、実際の表示サイズに合わせた `width/height` を記述。 |
| 「GA/Gtag/Facebook の読み込みでレンダリングを止めたくない」 | `gtag.js` と `fbevents.js` はそれぞれ `<script async>` で読み込み、Facebook Pixel も非同期スタブに変更。 |
| 「キャッシュバスターのクエリが `?v=v1.0.5` になってしまう」 | Git タグの `v` 接頭辞を除去して `?v=1.0.5` を付与するよう `normalizeVersionTag` を実装。 |

---

### 運用メモ

- 新しい要望を受けたら、このファイルに「要望」「対応内容」を追記しておく。
- README には実務フロー（複製手順・デザイン反映・SEO/PSI チェック）を記載し、具体的なナレッジは本ファイルで補完する。
