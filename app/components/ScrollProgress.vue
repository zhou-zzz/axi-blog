<script setup lang="ts">
import { Motion, useScroll, useSpring } from 'motion-v'

const { scrollYProgress } = useScroll()

const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
})
</script>

<template>
  <ClientOnly>
    <Motion
      class="fixed left-0 right-0 top-0 z-50 h-1 origin-left from-blue-500 to-purple-500 bg-gradient-to-r"
      :style="{ scaleX }"
    />
  </ClientOnly>
</template>
