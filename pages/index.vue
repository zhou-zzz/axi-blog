<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

</script>

<template>
  <article class="prose slide-enter m-auto">
    <ContentRenderer v-if="home" :value="home" />
  </article>
</template>
