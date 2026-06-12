# ZXY — Cinematic Depth

一个以深度叙事和极简美学为核心的品牌形象网站，基于 **Nuxt 3** 构建。

## 项目结构

```
my-webite/
├── components/          # 组件目录
│   ├── NavBar.vue
│   ├── HeroSection.vue
│   ├── ServicesSection.vue
│   ├── ServiceCard.vue
│   ├── WorksSection.vue
│   ├── WorkCard.vue
│   ├── FooterSection.vue
│   ├── CustomCursor.vue
│   └── GrainOverlay.vue
├── pages/
│   └── index.vue
├── layouts/
│   └── default.vue
├── composables/         # 组合式函数
├── i18n/locales/        # 国际化翻译
│   ├── en.json
│   └── zh-CN.json
├── assets/              # 全局样式
├── public/              # 静态资源
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
├── .gitignore
└── README.md
```

## 功能特性

- **Cinematic Depth Navigation** — 全屏滚动切换 + 缩放/透明度过渡动画
- **Custom Cursor** — 差异混合模式自定义光标，Hero 区域放大效果
- **3D Tilt Cards** — 服务卡片鼠标跟随 3D 倾斜
- **Grain Overlay** — 模拟胶片颗粒质感
- **i18n 国际化** — 支持英文 / 简体中文切换
- **响应式设计** — 适配桌面端和移动端

## 快速开始

```bash
npm install
npm run dev      # 开发模式 → http://localhost:3000
npm run build    # 构建生产版本
npm run generate # 静态站点生成
```

## 技术栈

| 技术 | 用途 |
|------|------|
| **Nuxt 3** | Vue 框架（SPA 模式） |
| **Tailwind CSS** | 原子化样式 |
| **Google Fonts** | Inter + Playfair Display |
| **Material Symbols** | 图标系统 |
| **@nuxtjs/i18n** | 国际化方案 |

## 许可

© 2024 ZXY. All Rights Reserved.
