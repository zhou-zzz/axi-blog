<script setup lang="ts">
useSeoMeta({
  title: '博客',
  description: '阿希的技术博客文章列表，分享前端开发、Vue.js、TypeScript 等技术心得。',
  ogTitle: '博客 - Axi Blog',
  ogDescription: '阿希的技术博客文章列表，分享前端开发、Vue.js、TypeScript 等技术心得。',
  ogType: 'website',
  twitterCard: 'summary',
})

const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('content').where('category', '=', 'blog').order('date', 'DESC').all()
})
</script>

<template>
  <Plum />
  <PostList title="博客文章" :posts="posts " />
</template>
