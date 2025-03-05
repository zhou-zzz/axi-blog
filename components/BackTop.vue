<script setup lang="ts">
const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 300
}

// 监听滚动事件，控制按钮显示/隐藏
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // 初始检查
  handleScroll()
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 滚动到顶部
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-show="isVisible"
      class="fixed bottom-20 right-6 z-10 cursor-pointer rounded-full p-2 text-zinc-400 transition-all duration-300 hover:bg-zinc-100 dark:text-zinc-500 hover:text-zinc-600 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-300"
      aria-label="回到顶部"
      title="回到顶部"
      @click="scrollToTop"
    >
      <div class="i-carbon-arrow-up text-xl" />
    </div>
  </Transition>
</template>
