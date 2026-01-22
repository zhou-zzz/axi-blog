// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-16',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Axi Blog',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '这是一个使用 Nuxt 3 构建的个人博客网站，采用了现代前端技术栈，支持暗黑模式和流畅的页面过渡效果。' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'Axi Blog - 个人技术博客' },
        { property: 'og:description', content: '这是一个使用 Nuxt 3 构建的个人博客网站，采用了现代前端技术栈，支持暗黑模式和流畅的页面过渡效果。' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  modules: ['@vueuse/nuxt', '@nuxt/content', '@unocss/nuxt', '@nuxtjs/color-mode', 'motion-v/nuxt'],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'vitesse-light',
            dark: 'vitesse-black',
          },
          preload: [
            'javascript',
            'js',
            'typescript',
            'ts',
            'python',
            'py',
            'bash',
            'json',
            'css',
            'html',
            'vue',
            'markdown',
            'md',
          ],
        },
      },
    },
  },
  components: {
    global: true,
    dirs: ['~/components'],
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    dataValue: 'theme',
  },
  css: [
    '@@/public/css/main.css',
    '@@/public/css/markdown.css',
    '@@/public/css/prose.css',
  ],
})
