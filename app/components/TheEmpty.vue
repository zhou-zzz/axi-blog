<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: '暂无内容',
  },
  description: {
    type: String,
    default: '欢迎你的访问，内容将很快更新',
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="i-carbon-document-blank text-5xl text-zinc-300 dark:text-zinc-600" />

    <h3 class="mt-4 text-lg text-zinc-800 font-medium dark:text-zinc-200">
      {{ message }}
    </h3>

    <p class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
      {{ description }}
    </p>
  </div>
</template>
