import type { TocLink } from '@nuxt/content'
import { useIntersectionObserver } from '@vueuse/core'

export function useToc(links: TocLink[]) {
  const activeLink = ref('')
  const userClicked = ref(false)
  const clickTimeout = ref<ReturnType<typeof setTimeout>>()
  const observerStops = ref<(() => void)[]>([])

  // Cache DOM element references
  const elementCache = new Map<string, HTMLElement>()

  function getElement(id: string): HTMLElement | null {
    if (elementCache.has(id)) {
      return elementCache.get(id)!
    }
    const el = document.getElementById(id)
    if (el) {
      elementCache.set(id, el)
    }
    return el
  }

  function initToc() {
    if (!import.meta.client || !links.length)
      return

    if (!activeLink.value) {
      activeLink.value = links[0].id
    }

    links.forEach((link) => {
      const el = getElement(link.id)
      if (!el)
        return

      const { stop } = useIntersectionObserver(
        el,
        ([entry]) => {
          if (!userClicked.value && entry?.isIntersecting) {
            activeLink.value = link.id
          }
        },
        {
          threshold: [0.1, 0.5],
          rootMargin: '-10% 0px -70% 0px',
        },
      )

      observerStops.value.push(stop)
    })

    return () => {
      observerStops.value.forEach(stop => stop())
      observerStops.value = []
      elementCache.clear()

      if (clickTimeout.value) {
        clearTimeout(clickTimeout.value)
      }
    }
  }

  function scrollToHeading(id: string) {
    const el = getElement(id)
    if (!el)
      return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    activeLink.value = id
    userClicked.value = true

    if (clickTimeout.value) {
      clearTimeout(clickTimeout.value)
    }

    clickTimeout.value = setTimeout(() => {
      userClicked.value = false
    }, 2000)
  }

  onMounted(() => {
    const cleanup = initToc()
    if (cleanup) {
      onBeforeUnmount(cleanup)
    }
  })

  return {
    activeLink,
    scrollToHeading,
  }
}
