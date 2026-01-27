<script setup lang="ts">
useSeoMeta({
  title: '笔记',
  description: '阿希的学习笔记，记录 Vue、React、Node.js 等技术学习过程和心得体会。',
  ogTitle: '笔记 - Axi Blog',
  ogDescription: '阿希的学习笔记，记录 Vue、React、Node.js 等技术学习过程和心得体会。',
  ogType: 'website',
  twitterCard: 'summary',
})

const { data: posts } = await useAsyncData('notes', () => {
  return queryCollection('content').where('category', '=', 'note').order('date', 'DESC').all()
})
</script>

<template>
  <Plum />
  <PostList title="笔记文章" :posts="posts" />
</template>
