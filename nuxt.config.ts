// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxt/content', '@unocss/nuxt', '@nuxtjs/color-mode'],
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
            'bash',
            'json',
            'css',
            'html',
            'vue',
            'markdown',
            'md',
          ],
        },
        components: {
          global: true,
        },
      },
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    dataValue: 'theme',
  },
  css: [
    '@/public/css/main.css',
    '@/public/css/markdown.css',
    '@/public/css/prose.css',
  ],
})
