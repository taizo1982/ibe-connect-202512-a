# 環境構築ガイド

## セットアップ

1. 依存関係をインストール
   ```bash
   npm install
   ```

2. 開発サーバーを起動
   ```bash
   npm run dev
   ```
   デフォルトで http://localhost:3000/ が開きます。

---

## 計測タグの設定

Google Analytics／広告および Meta 広告のタグ ID は `.env` で一元管理できます。

### 手順

1. `.env.example` を `.env` としてコピー
2. 下記の環境変数にそれぞれの ID／APP ID を入力
3. `npm run dev` もしくは `npm run build:ssg` を実行すると、設定した値がビルドに反映

### 環境変数一覧

| 変数名 | 説明 |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 の測定 ID（例: `G-XXXXXXXXXX`） |
| `VITE_GA_ADS_ID` | Google 広告（コンバージョン）の ID（例: `AW-XXXXXXXXXX`、任意） |
| `VITE_GA_ADS_CONVERSION_LABEL` | Google 広告のコンバージョンラベル（`AW-XXXXXXX/XXXXXXXX` の後半。Ads のコンバージョンイベントを送信する場合に必須） |
| `VITE_META_PIXEL_ID` | Meta (Facebook) Pixel ID |
| `VITE_META_APP_ID` | Meta アプリ ID。Pixel を Business アプリと連携する場合のみ設定（任意） |

値を未設定のままにした場合は、該当タグは読み込まれません。設定済みの ID/APP ID はビルド時に `index.html` の `<head>` へ埋め込まれ、静的ホスティングでも自動で各タグが読み込まれます。

`VITE_GA_ADS_CONVERSION_LABEL` を指定すると、サイト内の「パーティーに参加する／今すぐ応募する」CTA クリック時に Google 広告および Meta Pixel へコンバージョンイベントが送信されます（ラベル未設定時は GA4/Pixel のイベントのみ送信されます）。

---

## OGP / ソーシャルシェアの設定

OGP・Twitter Card 用のメタタグは `.env` 経由で動的に差し込めます。

### 環境変数一覧

| 変数名 | 説明 |
| --- | --- |
| `VITE_OG_TITLE` | 各 SNS に表示したいページタイトル |
| `VITE_OG_DESCRIPTION` | シェア時の説明文 |
| `VITE_OG_SITE_NAME` | `og:site_name` に表示するサービス名 |
| `VITE_OG_URL` | 正規 URL（`og:url`） |
| `VITE_OG_IMAGE_URL` | シェア用サムネイル画像の絶対 URL |
| `VITE_TWITTER_CARD` | Twitter Card の種類（例: `summary_large_image`） |
| `VITE_TWITTER_SITE` | Twitter(X) の公式アカウント（`@` を含めて指定） |
| `VITE_TWITTER_CREATOR` | 制作者／運営担当のアカウント（任意） |

ビルド時にこれらの値が `index.html` の OGP/Twitter 用 `<meta>` タグへ埋め込まれます。値を更新した場合は `npm run build` や `npm run build:ssg` を再実行し、生成された `build/index.html` を再デプロイしてください。

---

## 静的サイト生成 (SSG)

本プロジェクトは静的サイトとして出力できます。

### コマンド

```bash
npm run build:ssg
```

### 処理内容

1. `vite build` でクライアントバンドルを作成
2. `vite build --ssr src/entry-server.tsx` で SSR バンドルを作成
3. `node ./scripts/prerender.mjs` で生成された HTML にプレレンダリング結果を埋め込み

生成物は `build/` ディレクトリに出力され、`index.html` と `assets/` をそのまま静的ホスティングにアップロードすれば表示されます。

---

## ブラウザキャッシュ対策

`npm run build` 完了後に実行される `scripts/inject-analytics-html.mjs` で、Git のバージョンタグ（`git describe --tags --dirty --always` の結果）を取得し、`build/index.html` 内の `assets/` および `img/` 配下リソースへ `?v=<gitタグ>` を自動付与します。

これにより、サイト更新時にブラウザへ新しいファイルを確実に読ませることができます。Git リポジトリ情報が利用できない環境では、日時ベースのフォールバック値を使用します。

---

## 画像最適化フロー

- 主要画像（`src/assets/*.png`）はビルド前に Sharp を使って WebP / AVIF に自動変換
- コマンド `npm run optimize:images` で変換が実行され、`npm run build` はこのコマンドを先に呼び出す
- コンポーネント側では `<picture>` タグを使用して AVIF → WebP → PNG の順にフォールバック

### 画像を追加・更新した場合

1. PNG を `src/assets/` に配置
2. `npm run optimize:images` を再実行

変換済みファイルは更新日時を比較しながら再生成されます。

---

## 新しい環境へコピーする場合

以下のファイル群を新しいプロジェクトへコピーしてください。

### 必要なファイル

- `vite.config.ts`（`base: "./"` や各種エイリアス設定を含む Vite 設定）
- `src/main.tsx`（ハイドレーション対応を行ったクライアントエントリ）
- `src/entry-server.tsx`（SSR/SSG 用のサーバーエントリ）
- `scripts/prerender.mjs`（プレレンダリングで HTML にマークアップを埋め込むスクリプト）
- `src/` 配下のコンポーネント、スタイル、アセット一式
- `package-lock.json`（依存関係を正しく再現するため）

### セットアップ手順

```bash
npm install
npm run build:ssg
```

`node_modules/` や `build/` などの生成物はコピーする必要はありません。
