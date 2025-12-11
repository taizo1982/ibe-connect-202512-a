# デザインガイドライン

## デザインコンセプト

**「温かみのある信頼感」×「大人のカジュアル」**

30〜40代の真剣に出会いを求める大人に向けた、安心感と親しみやすさを両立したデザイン。派手すぎず、地味すぎず、「ちょっと素敵な夜」を予感させる雰囲気。

## カラーパレット

### プライマリカラー

```css
:root {
  /* メインカラー */
  --color-primary-pink: #E87A93;
  --color-primary-pink-light: #F4A5B5;
  --color-primary-pink-dark: #D4566D;
  
  --color-primary-blue: #6EB4D8;
  --color-primary-blue-light: #9ECCE8;
  --color-primary-blue-dark: #4A9AC4;
  
  /* ニュートラル */
  --color-text-primary: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #FDF8F9;  /* ほんのりピンク */
  --color-bg-tertiary: #F5FAFE;   /* ほんのりブルー */
  --color-bg-dark: #2D2D2D;
  
  /* アクセント */
  --color-accent-gold: #D4A574;   /* 高級感 */
  --color-success: #6BBF8A;
  --color-warning: #F5B041;
  --color-error: #E74C3C;
}
```

### グラデーション

```css
/* ヒーロー背景用 */
--gradient-hero: linear-gradient(135deg, #FDF8F9 0%, #F5FAFE 100%);

/* CTAボタン用 */
--gradient-cta: linear-gradient(135deg, #E87A93 0%, #F4A5B5 100%);

/* セクション区切り用 */
--gradient-divider: linear-gradient(90deg, #E87A93 0%, #6EB4D8 100%);
```

## タイポグラフィ

### フォントファミリー

```css
/* 見出し・アクセント */
font-family: 'Zen Maru Gothic', 'Noto Sans JP', sans-serif;

/* 本文 */
font-family: 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif;

/* 英字アクセント */
font-family: 'Playfair Display', serif;
```

### フォントサイズ（モバイルファースト）

```css
/* ヒーローキャッチコピー */
--text-hero: clamp(1.75rem, 5vw, 2.5rem);

/* セクションタイトル */
--text-section-title: clamp(1.5rem, 4vw, 2rem);

/* サブタイトル */
--text-subtitle: clamp(1rem, 2.5vw, 1.25rem);

/* 本文 */
--text-body: 1rem;        /* 16px */
--text-body-sm: 0.875rem; /* 14px */

/* キャプション */
--text-caption: 0.75rem;  /* 12px */
```

### 行間・字間

```css
/* 見出し */
line-height: 1.4;
letter-spacing: 0.05em;

/* 本文 */
line-height: 1.8;
letter-spacing: 0.02em;
```

## スペーシング

```css
:root {
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-2xl: 4rem;    /* 64px */
  --space-3xl: 6rem;    /* 96px */
}

/* セクション間 */
padding-block: var(--space-2xl);

/* モバイル */
@media (max-width: 768px) {
  padding-block: var(--space-xl);
}
```

## コンポーネントスタイル

### CTAボタン

```css
.btn-cta {
  background: var(--gradient-cta);
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(232, 122, 147, 0.4);
  transition: all 0.3s ease;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 122, 147, 0.5);
}

/* パルスアニメーション（注目を引く） */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

### カード

```css
.card {
  background: white;
  border-radius: 16px;
  padding: var(--space-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
```

### セクションタイトル

```css
.section-title {
  text-align: center;
  position: relative;
  padding-bottom: var(--space-sm);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--gradient-divider);
  border-radius: 2px;
}
```

### FAQ アコーディオン

```css
.faq-item {
  border-bottom: 1px solid #eee;
  padding: var(--space-sm) 0;
}

.faq-question {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.open .faq-answer {
  max-height: 500px;
}
```

## アニメーション

### スクロールフェードイン

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### スタッガードアニメーション（連続要素用）

```css
.stagger-item:nth-child(1) { transition-delay: 0.1s; }
.stagger-item:nth-child(2) { transition-delay: 0.2s; }
.stagger-item:nth-child(3) { transition-delay: 0.3s; }
/* ... */
```

### ホバーエフェクト

```css
/* 画像ズーム */
.img-zoom {
  overflow: hidden;
}
.img-zoom img {
  transition: transform 0.5s ease;
}
.img-zoom:hover img {
  transform: scale(1.05);
}
```

## アイコン

Lucide Icons または Heroicons を使用

### 使用アイコン例

- 🍷 店舗アイコン: `wine`, `utensils`, `flame`
- ✓ チェックマーク: `check-circle`
- 👤 人物: `user`, `users`
- 📍 場所: `map-pin`
- 🕐 時間: `clock`
- 💬 吹き出し: `message-circle`
- ❓ FAQ: `help-circle`
- ➡️ 矢印: `arrow-right`, `chevron-down`

## 画像スタイル

### プレースホルダー

```css
.placeholder-image {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.875rem;
}
```

### 画像オーバーレイ

```css
.image-overlay {
  position: relative;
}
.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%);
}
```

## レスポンシブブレークポイント

```css
/* Tailwind デフォルト準拠 */
sm: 640px   /* スマホ横向き〜 */
md: 768px   /* タブレット〜 */
lg: 1024px  /* デスクトップ〜 */
xl: 1280px  /* ワイドデスクトップ〜 */
```

## アクセシビリティ

### フォーカス表示

```css
:focus-visible {
  outline: 3px solid var(--color-primary-pink);
  outline-offset: 2px;
}
```

### コントラスト比

- テキスト（primary）: 7:1 以上
- テキスト（secondary）: 4.5:1 以上
- CTAボタン上のテキスト: 4.5:1 以上

## 禁止事項

- ❌ 純粋な黒 `#000000` の使用（`#333333` を使用）
- ❌ 1px 未満のボーダー
- ❌ 過度なドロップシャドウ
- ❌ 派手すぎるアニメーション
- ❌ 読みにくいフォントサイズ（14px 未満の本文）
