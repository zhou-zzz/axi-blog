<script setup lang="ts">
import { Motion } from 'motion-v'

const color = useColorMode()
const route = useRoute()
const activeIndex = ref(-1)

function getNeighborScale(index: number) {
  if (activeIndex.value === -1) return 1
  const distance = Math.abs(index - activeIndex.value)
  // 使用简单的缩放曲线
  return 1 + Math.max(0, 0.3 * (1 - Math.pow(distance / 2, 2)))
}


const navItems = [
  { to: '/', icon: 'i-carbon-home', title: '首页' },
  { to: '/posts', icon: 'i-ri-article-line', title: '博客' },
  { to: '/notes', icon: 'i-ri-book-line', title: '笔记' },
  { to: '/projects', icon: 'i-carbon-folder', title: '项目' },
  { to: 'https://github.com/zhou-zzz', icon: 'i-uil-github-alt', title: 'Github' },
]

function toggleDark(event: MouseEvent) {
  // 检查浏览器是否支持 View Transition API
  if (!document.startViewTransition) {
    // 降级方案：直接切换主题
    color.preference = color.value === 'dark' ? 'light' : 'dark'
    return
  }

  // 检查用户是否开启了减少动画选项
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    color.preference = color.value === 'dark' ? 'light' : 'dark'
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(async () => {
    color.preference = color.value === 'dark' ? 'light' : 'dark'
    await nextTick()
  })

  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: color.value === 'dark'
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: color.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <!-- 简化为固定位置的导航栏 -->
  <header class="pointer-events-none fixed inset-x-0 bottom-10 z-30 flex justify-center">
    <!-- 导航栏 -->
    <nav class="z-50 pointer-events-auto relative flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg dark:shadow-white/10">
      <div class="flex items-center justify-center space-x-3">
        <Motion
          v-for="(item, index) in navItems"
          :key="item.to"
          :initial="{ scale: 1 }"
          :animate="{ 
            scale: getNeighborScale(index),
            y: activeIndex === index ? -6 : 0,
            transition: { 
              type: 'spring', 
              stiffness: 500, 
              damping: 20
            }
          }"
          @mouseenter="activeIndex = index"
          @mouseleave="activeIndex = -1"
          class="flex items-center justify-center"
        >
          <NuxtLink 
            :to="item.to"
            :title="item.title"
            class="p-2.5 rounded-full transition-colors duration-300 flex items-center justify-center text-gray-700 op70 dark:color-white hover:op100"
            :class="route.path === item.to ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-900'"
          >
            <div :class="[item.icon, 'text-xl']" />
          </NuxtLink>
        </Motion>

        <!-- 分隔线 -->
        <div class="w-px h-8 mx-1 bg-gray-200 dark:bg-gray-800" />

        <!-- 主题切换按钮 -->
        <Motion
          :initial="{ scale: 1 }"
          :animate="{ 
            scale: getNeighborScale(navItems.length),
            y: activeIndex === navItems.length ? -6 : 0,
            transition: { 
              type: 'spring', 
              stiffness: 300, 
              damping: 20
            }
          }"
          @mouseenter="activeIndex = navItems.length"
          @mouseleave="activeIndex = -1"
          class="flex items-center justify-center"
        >
          <div 
            class="p-2.5 rounded-full cursor-pointer transition-colors duration-300 flex items-center justify-center text-gray-700  op70 dark:color-white hover:op100 hover:bg-gray-100 dark:hover:bg-gray-900"
            @click="toggleDark"
          >
            <div i-carbon-sun dark:i-carbon-moon text-xl />
          </div>
        </Motion>
      </div>
    </nav>
  </header>
</template>
