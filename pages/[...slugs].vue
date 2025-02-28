<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(() => queryCollection('content').path(route.path).first())

</script>

<template>
  <article class="prose slide-enter m-auto">
    <ContentRenderer v-if="data" :value="data" />
  </article>
</template>
