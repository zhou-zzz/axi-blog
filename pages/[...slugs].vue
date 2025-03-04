<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(route.path).first())

// 获取上一级路径
function getParentPath() {
  const pathParts = route.path.split('/')
  pathParts.pop() // 移除最后一部分
  return pathParts.join('/') || '/' // 如果为空则返回根路径
}
</script>

<template>
  <article class="slide-enter markdown-body m-auto prose">
    <BlurFade :delay="0.1">
      <ContentRenderer v-if="data" :value="data" />
    </BlurFade>
  </article>
  <div class="mb-4 mt-8 flex justify-start">
    <NuxtLink :to="getParentPath()" class="flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
      <div class="i-carbon-arrow-left mr-1" />
      <span>cd ..</span>
    </NuxtLink>
  </div>
</template>
