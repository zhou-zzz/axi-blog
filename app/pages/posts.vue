<script setup lang="ts">
import { Motion } from 'motion-v'

useHead({
  title: '博客',
})

const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('content').where('category', '=', 'blog').order('date', 'DESC').all()
})
</script>

<template>
  <Plum />
  <div class="container mx-auto px-4 py-8">
    <BlurFade :delay="0.1">
      <h1 class="mb-6 text-3xl font-bold">
        博客文章
      </h1>
    </BlurFade>

    <BlurFade :delay="0.2">
      <div class="space-y-4">
        <Motion
          v-for="(post, idx) in posts"
          :key="post.id"
          :variants="{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: idx * 0.1,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }"
          class="group"
          initial="hidden"
          animate="visible"
        >
          <NuxtLink
            :to="post.path"
            class="block px-2 py-3 transition-colors duration-300 -mx-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
          >
            <div class="flex items-center">
              <span class="flex-1 text-zinc-800 dark:text-zinc-100">
                {{ post.title }}
              </span>
              <div class="transform text-sm text-zinc-400 transition-transform duration-300 group-hover:translate-x-1 dark:text-zinc-500">
                →
              </div>
            </div>

            <div class="mt-2 flex items-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
              <time :datetime="post.date" class="font-mono">
                {{ post.date }}
              </time>

              <div v-if="post.tags" class="flex items-center gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="flex items-center gap-1"
                >
                  <div class="i-carbon-tag text-xs opacity-60" />
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </Motion>
      </div>
    </BlurFade>
  </div>
</template>
