<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(route.path).first())

useHead(useSeo(data))

const tocLinks = computed(() => data.value?.body?.toc?.links || [])

function getParentPath() {
  const pathParts = route.path.split('/')
  pathParts.pop()
  return pathParts.join('/') || '/'
}
</script>

<template>
  <div class="relative">
    <GridBackground />
    <TocNavigation :links="tocLinks" />
    <article class="slide-enter markdown-body relative m-auto prose md:flex-1">
      <BlurFade :delay="0.1">
        <ContentRenderer v-if="data" :value="data" />
        <TheEmpty v-else message="暂未找到你搜的文章" description="欢迎你的访问！" />
      </BlurFade>
    </article>
    <div class="mb-4 mt-8 flex justify-start">
      <NuxtLink
        :to="getParentPath()"
        class="flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      >
        <span>cd ..</span>
      </NuxtLink>
    </div>
    <BackTop />
  </div>
</template>
