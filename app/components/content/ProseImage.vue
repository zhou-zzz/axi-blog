<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
}>()

const containerRef = ref<HTMLDivElement>()

onMounted(() => {
  if (containerRef.value) {
    const img = containerRef.value.querySelector('img')
    if (img) {
      mediumZoom(img, {
        margin: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        scrollOffset: 0,
      })
    }
  }
})
</script>

<template>
  <div ref="containerRef" class="content-image">
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
      class="rounded-lg"
      loading="lazy"
      format="webp"
      quality="80"
    />
  </div>
</template>

<style scoped>
.content-image img {
  max-width: 100%;
  height: auto;
  cursor: zoom-in;
}

:deep(.medium-zoom-image) {
  transition: transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
}

:deep(.medium-zoom-overlay) {
  transition: opacity 0.3s !important;
}
</style>
