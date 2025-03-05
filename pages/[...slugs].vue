<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(route.path).first())

function getParentPath() {
  const pathParts = route.path.split('/')
  pathParts.pop()
  return pathParts.join('/') || '/'
}
</script>

<template>
  <div class="relative">
    <GridBackground />
    <article class="slide-enter markdown-body relative m-auto prose">
      <BlurFade :delay="0.1">
        <ContentRenderer v-if="data" :value="data" />
      </BlurFade>
    </article>
    <div class="mb-4 mt-8 flex justify-start">
      <NuxtLink :to="getParentPath()" class="flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
        <span>cd ..</span>
      </NuxtLink>
    </div>
    <BackTop />
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

/* 可选：添加渐变遮罩，让网格在边缘渐隐 */
.bg-grid-pattern::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    var(--bg-color, #ffffff) 100%
  );
}

:root {
  --bg-color: #ffffff;
}

html.dark {
  --bg-color: #121212;
}
</style>
