<script setup lang="ts">
import { Motion } from 'motion-v'
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

</script>

<template>
  <article class="prose m-auto">
    <div v-if="home">
      <Motion 
        :initial="{ opacity: 0, y: 100 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ 
          type: 'spring',
          stiffness: 100,
          damping: 12,
          delay: 0.1 
        }"
      >
        <ContentRenderer :value="home" />
      </Motion>
    </div>
  </article>
</template>
