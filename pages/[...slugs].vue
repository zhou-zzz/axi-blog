<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(route.path).first())
</script>

<template>
  <article class="slide-enter m-auto prose">
    <ContentRenderer v-if="data" :value="data" />
  </article>
</template>
