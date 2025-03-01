<script setup lang="ts">
const { data: posts } = await useAsyncData('/posts', () => {
  return queryCollection('content').where('category', '=', 'blog').all()
})
</script>

<template>
  <div class="prose">
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
