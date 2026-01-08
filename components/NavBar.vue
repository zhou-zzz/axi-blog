<script setup lang="ts">
import { useMotionValue } from 'motion-v'

const color = useColorMode()

// 使用 motion-v 的值系统追踪鼠标位置
const mouseX = useMotionValue(Infinity)

const navItems = [
  { to: '/', icon: 'i-carbon-home', title: '首页' },
  { to: '/posts', icon: 'i-ri-article-line', title: '博客' },
  { to: '/notes', icon: 'i-ri-book-line', title: '笔记' },
  { to: '/projects', icon: 'i-carbon-folder', title: '项目' },
]

// 配置参数
const MAGNIFICATION = 1.4 // 最大放大倍数
const DISTANCE = 140 // 影响范围（像素）
const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 200,
  damping: 15,
}

function handleMouseMove(event: MouseEvent) {
  mouseX.set(event.clientX)
}

function handleMouseLeave() {
  mouseX.set(Infinity)
}

function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
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
          fill: 'forwards',
          pseudoElement: color.value === 'dark'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 bottom-8 z-30 flex justify-center">
    <nav
      class="pointer-events-auto relative z-50 flex items-center rounded-full bg-white/80 px-3 py-1.5 shadow-md backdrop-blur-lg dark:bg-black/80 dark:shadow-white/10"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="flex items-center justify-center space-x-2">
        <NavBarItem
          v-for="item in navItems"
          :key="item.to"
          :item="item"
          :mouse-x="mouseX"
          :magnification="MAGNIFICATION"
          :distance="DISTANCE"
          :spring-config="SPRING_CONFIG"
        />

        <div class="mx-0.5 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

        <!-- 主题切换按钮 -->
        <NavBarThemeToggle
          :mouse-x="mouseX"
          :magnification="MAGNIFICATION"
          :distance="DISTANCE"
          :spring-config="SPRING_CONFIG"
          @toggle="toggleDark"
        />
      </div>
    </nav>
  </header>
</template>
