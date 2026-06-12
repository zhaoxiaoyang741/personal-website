export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      Inter: [400, 600, 700],
      'Playfair Display': {
        wght: [600, 700],
        ital: [400],
      },
    },
    display: 'swap',
    preconnect: true,
  },

  app: {
    head: {
      title: 'ZXY | Cinematic Depth',
      htmlAttrs: {
        lang: 'zh-CN',
        class: 'light',
      },
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh-CN', language: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
    ],
    defaultLocale: 'en',
    lazy: false,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  tailwindcss: {
    configPath: 'tailwind.config',
    cssPath: '~/assets/css/main.css',
  },

  compatibilityDate: '2026-06-11',
})
