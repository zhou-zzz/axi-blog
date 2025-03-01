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
            // Default theme (same as single string)
            default: 'vitesse-light',
            // Theme used if `html.dark`
            dark: 'vitesse-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
          preload: [
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'diff',
            'shell',
            'markdown',
            'yaml',
            'bash',
            'ini'
          ]
        }
      }
    }
  },
  colorMode: {
    preference: 'system',
    fallback:'light',
    classSuffix: '',
  },
  css: [
    '@/public/css/main.css',
    '@/public/css/markdown.css',
    // '@/public/css/prose.css',
  ]
})
