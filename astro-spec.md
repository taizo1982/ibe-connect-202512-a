# Astro 実装仕様

## プロジェクトセットアップ

```bash
# プロジェクト作成
npm create astro@latest ibeconnect-lp -- --template minimal

# 移動
cd ibeconnect-lp

# Tailwind CSS インストール
npx astro add tailwind

# 追加パッケージ
npm install @astrojs/sitemap
```

## astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ibeconnect.net',
  base: '/lp/yasu-hashigo/',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  build: {
    assets: 'assets',
  },
});
```

## tailwind.config.mjs

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          pink: '#E87A93',
          'pink-light': '#F4A5B5',
          'pink-dark': '#D4566D',
          blue: '#6EB4D8',
          'blue-light': '#9ECCE8',
          'blue-dark': '#4A9AC4',
        },
        accent: {
          gold: '#D4A574',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Sans"', 'sans-serif'],
        display: ['"Zen Maru Gothic"', '"Noto Sans JP"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FDF8F9 0%, #F5FAFE 100%)',
        'gradient-cta': 'linear-gradient(135deg, #E87A93 0%, #F4A5B5 100%)',
        'gradient-divider': 'linear-gradient(90deg, #E87A93 0%, #6EB4D8 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};
```

## ディレクトリ構成

```
src/
├── components/
│   ├── common/
│   │   ├── Button.astro
│   │   ├── SectionTitle.astro
│   │   ├── Card.astro
│   │   └── Badge.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── FloatingCTA.astro
│   └── sections/
│       ├── Hero.astro
│       ├── Problems.astro
│       ├── Target.astro
│       ├── Features.astro
│       ├── Schedule.astro
│       ├── Testimonials.astro
│       ├── EventInfo.astro
│       ├── Venues.astro
│       ├── FAQ.astro
│       ├── FinalCTA.astro
│       └── Sponsors.astro
├── data/
│   ├── company.json
│   ├── event.json
│   └── content.json
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── styles/
│   └── global.css
└── assets/
    └── images/
        ├── logo.png
        └── placeholder/
            ├── bar.jpg
            ├── izakaya.jpg
            └── yakiniku.jpg
public/
├── favicon.svg
└── og-image.jpg
```

## データファイル

### src/data/event.json

```json
{
  "title": "恋の三軒はしごナイト in 野洲",
  "subtitle": "30〜40代限定・真剣交際を望む大人のためのバル婚活パーティー",
  "date": "2026-02-28",
  "dateDisplay": "2026年2月28日（金）",
  "time": {
    "start": "18:30",
    "end": "21:50"
  },
  "location": {
    "area": "野洲駅徒歩5分圏内",
    "prefecture": "滋賀県"
  },
  "price": {
    "male": 7000,
    "female": 4000
  },
  "target": {
    "ageMin": 30,
    "ageMax": 49,
    "status": "独身"
  },
  "entryUrl": "#entry",
  "lineUrl": "#line"
}
```

## コンポーネント例

### src/components/common/Button.astro

```astro
---
interface Props {
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  class?: string;
}

const {
  href = '#entry',
  size = 'medium',
  variant = 'primary',
  fullWidth = false,
  class: className = '',
} = Astro.props;

const sizeClasses = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

const variantClasses = {
  primary: 'bg-gradient-cta text-white shadow-lg shadow-primary-pink/40 hover:shadow-xl hover:shadow-primary-pink/50',
  outline: 'border-2 border-primary-pink text-primary-pink hover:bg-primary-pink hover:text-white',
};
---

<a
  href={href}
  class:list={[
    'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className,
  ]}
>
  <slot />
</a>
```

### src/components/sections/Hero.astro

```astro
---
import Button from '../common/Button.astro';
import Badge from '../common/Badge.astro';
import event from '../../data/event.json';
---

<section class="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
  <div class="container mx-auto px-4 py-16 lg:py-24">
    <div class="max-w-3xl mx-auto text-center lg:text-left lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
      <div class="space-y-6">
        <Badge>{event.dateDisplay}開催</Badge>
        
        <h1 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          さすがに一晩で三軒も<br class="hidden sm:inline" />ハシゴしたら、<br />
          結婚相手も見つけられる<span class="text-primary-pink">！？</span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600">
          {event.subtitle}
        </p>
        
        <div class="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
          <span class="bg-primary-blue/10 text-primary-blue-dark px-4 py-2 rounded-full">
            男性 {event.price.male.toLocaleString()}円
          </span>
          <span class="bg-primary-pink/10 text-primary-pink-dark px-4 py-2 rounded-full">
            女性 {event.price.female.toLocaleString()}円
          </span>
        </div>
        
        <div class="pt-4">
          <Button size="large" class="animate-pulse-soft">
            今すぐ参加申し込み
          </Button>
        </div>
      </div>
      
      <div class="hidden lg:block">
        <!-- ヒーローイメージ or イラスト -->
        <div class="aspect-square bg-white/50 rounded-3xl flex items-center justify-center text-gray-400">
          イメージ画像
        </div>
      </div>
    </div>
  </div>
  
  <!-- 装飾 -->
  <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-pink/10 rounded-full blur-3xl"></div>
  <div class="absolute -top-20 -right-20 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl"></div>
</section>
```

### src/layouts/Layout.astro

```astro
---
import '../styles/global.css';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import FloatingCTA from '../components/layout/FloatingCTA.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = '' } = Astro.props;
---

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
    
    <!-- OGP -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body class="font-sans text-gray-800 antialiased">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <FloatingCTA />
    
    <script>
      // スクロールアニメーション
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
      });
    </script>
  </body>
</html>
```

### src/styles/global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply leading-relaxed;
  }
}

@layer components {
  .section-padding {
    @apply py-16 md:py-24;
  }
  
  .container-narrow {
    @apply max-w-4xl mx-auto px-4;
  }
  
  .fade-in-up {
    @apply opacity-0 translate-y-5 transition-all duration-700;
  }
  
  .fade-in-up.visible {
    @apply opacity-100 translate-y-0;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## SEO・パフォーマンス

### 画像最適化

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="婚活パーティーのイメージ"
  width={800}
  height={600}
  format="webp"
  quality={80}
  loading="eager"
/>
```

### 構造化データ

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "恋の三軒はしごナイト in 野洲",
  "startDate": "2026-02-28T18:30:00+09:00",
  "endDate": "2026-02-28T21:50:00+09:00",
  "location": {
    "@type": "Place",
    "name": "野洲駅周辺",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "野洲市",
      "addressRegion": "滋賀県",
      "addressCountry": "JP"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "一般社団法人アイビーコネクト",
    "url": "https://ibeconnect.net"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "男性",
      "price": "7000",
      "priceCurrency": "JPY"
    },
    {
      "@type": "Offer",
      "name": "女性",
      "price": "4000",
      "priceCurrency": "JPY"
    }
  ]
})} />
```

## ビルド・デプロイ

```bash
# 開発サーバー
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### 出力先
`dist/` フォルダに静的ファイルが生成される
