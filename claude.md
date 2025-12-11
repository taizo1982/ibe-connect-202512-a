# 婚活イベントLP制作プロジェクト（Aパターン）

## プロジェクト概要

一般社団法人アイビーコネクト主催の婚活パーティー「恋の三軒はしごナイト in 野洲」のランディングページを制作する。

## このLPのテーマ

**「アプリ疲れ → 人柄が分かる出会い」**

マッチングアプリに疲れた30〜40代に向けて、「会って話す」ことで人柄が分かる出会いの価値を訴求する。

### ターゲット像
- マッチングアプリを使っているが成果が出ない
- プロフィールやメッセージだけでは相性が分からないと感じている
- 時間・お金・エネルギーを消耗している感覚がある
- 真剣だが、ガチガチの婚活は抵抗がある

### キーメッセージ
```
アプリでは分からない"人柄"から、ちゃんと好きになれる出会いを。
```

## 技術スタック

- **フレームワーク**: Astro (SSG)
- **スタイリング**: Tailwind CSS
- **アニメーション**: CSS Animations / View Transitions
- **フォント**: Google Fonts（Noto Sans JP + Zen Maru Gothic）

## ディレクトリ構成

```
src/
├── pages/
│   └── index.astro          # メインLP
├── components/
│   ├── common/
│   │   ├── Button.astro
│   │   ├── SectionTitle.astro
│   │   └── Card.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── FloatingCTA.astro
│   └── sections/
│       ├── Hero.astro
│       ├── EmpathyStory.astro
│       ├── Concept.astro
│       ├── Features.astro
│       ├── Schedule.astro
│       ├── Target.astro
│       ├── Testimonials.astro
│       ├── Trust.astro
│       ├── EventInfo.astro
│       ├── FAQ.astro
│       └── Closing.astro
├── data/
│   ├── company.json
│   └── event.json
├── layouts/
│   └── Layout.astro
├── styles/
│   └── global.css
└── assets/
    └── images/
        └── logo.png
public/
├── favicon.svg
└── og-image.jpg
```

## 参照ドキュメント

| ファイル | 内容 |
|---------|------|
| `company.md` | 会社情報（他案件でも再利用可能） |
| `event.md` | イベント詳細情報 |
| `design.md` | デザインガイドライン |
| `structure.md` | LP構造・セクション設計 |
| `copy.md` | コピーライティング原稿 |
| `astro-spec.md` | Astro実装仕様 |

## セクション構成（10セクション）

```
0. Hero - キャッチ「アプリでは分からない"人柄"から...」
1. EmpathyStory - アプリ疲れへの共感
2. Concept - 「会って話す」にフォーカス
3. Features - 人柄に出会える3つの理由
4. Schedule - 当日の流れ
5. Target - アプリ疲れ層向けチェックリスト
6. Testimonials - アプリ比較の参加者コメント
7. Trust - 安心の運営体制
8. EventInfo - 開催概要
9. FAQ - 勧誘・連絡先系優先
10. Closing - 「ちゃんと向き合って話せる出会い」
```

## コンバージョン最適化の実装ポイント

### 1. ファーストビュー（3秒ルール）
- キャッチコピーは大きく、明確に
- CTAボタンをファーストビュー内に配置
- 開催日・参加費を即座に認識できるように

### 2. CTAボタン配置（7箇所）
- Header（小）
- Hero（大）
- EmpathyStory末尾（テキストリンク）
- Features末尾（中）
- Schedule末尾（中）
- Closing（最大）
- FloatingCTA（スマホ常時表示）

### 3. 社会的証明
- 参加者の声（アプリとの比較コメント）
- 非営利団体主催の信頼性

### 4. 不安解消
- FAQ でアプリ疲れ層が気にする点を優先
- 「連絡先交換禁止」のルールを強調

## レスポンシブ対応

- **モバイルファースト設計**
- ブレークポイント: `sm:640px`, `md:768px`, `lg:1024px`
- スマホでのタップ領域は最低44px

## パフォーマンス要件

- Lighthouse Performance: 90+
- 画像は WebP 形式、lazy loading
- Core Web Vitals 最適化

## 実装手順

1. `npm create astro@latest` でプロジェクト作成
2. Tailwind CSS インストール・設定
3. 共通レイアウト作成
4. 各コンポーネントを上から順に実装
5. レスポンシブ調整
6. アニメーション追加
7. パフォーマンス最適化
8. テスト・確認

## 注意事項

- 会社情報は `company.md` から取得
- イベント固有の情報は `event.md` から取得
- 画像がない箇所はプレースホルダーを配置
- LINE URL は `#line` で仮置き
- 申し込みURL は `#entry` で仮置き
