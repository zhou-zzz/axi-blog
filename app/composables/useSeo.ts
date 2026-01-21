import type { ContentCollectionItem } from '@nuxt/content'

type Data = Ref<ContentCollectionItem | null>

export function useSeo(data: Data) {
  const route = useRoute()
  const config = useRuntimeConfig()

  const baseUrl = config.public.siteUrl || 'https://helloaxi.me'
  const currentUrl = computed(() => `${baseUrl}${route.path}`)

  const title = computed(() => {
    const pageTitle = data.value?.title
    return pageTitle ? `${pageTitle}` : '文章详情'
  })

  const description = computed(() => data.value?.description || '文章详情页')
  const publishDate = computed(() => data.value?.date || new Date().toISOString())
  const tags = computed(() => data.value?.tags || [])

  const getSeoMeta = () => {
    return {
      title: title.value,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: description.value },
        { property: 'og:url', content: currentUrl.value },
        { property: 'og:type', content: 'article' },
        { property: 'article:published_time', content: publishDate.value },
        { property: 'article:tag', content: tags.value.join(', ') },
        { name: 'keywords', content: tags.value.join(', ') },
        { property: 'og:site_name', content: 'Axi Blog' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title.value },
        { name: 'twitter:description', content: description.value },
      ],
      link: [
        { rel: 'canonical', href: currentUrl.value },
      ],
    }
  }

  return {
    title,
    description,
    currentUrl,
    getSeoMeta,
  }
}
