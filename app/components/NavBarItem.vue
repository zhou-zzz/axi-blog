<script setup lang="ts">
import type { MotionValue } from 'motion-v'
import { useSpring, useTransform } from 'motion-v'

interface NavItem {
  to: string
  icon: string
  title: string
}

interface SpringConfig {
  mass: number
  stiffness: number
  damping: number
}

interface Props {
  item: NavItem
  mouseX: MotionValue<number>
  magnification: number
  distance: number
  springConfig: SpringConfig
}

const props = defineProps<Props>()
const route = useRoute()

const itemRef = ref<HTMLElement>()
const currentScale = ref(1)
const currentY = ref(0)

// 计算鼠标距离当前元素的距离
const mouseDistance = useTransform(props.mouseX, (mouseXValue: number) => {
  const rect = itemRef.value?.getBoundingClientRect()
  if (!rect)
    return Infinity

  // 计算元素中心点到鼠标的距离
  const itemCenterX = rect.left + rect.width / 2
  return mouseXValue - itemCenterX
})

// 基于距离计算目标缩放值
const targetScale = useTransform(
  mouseDistance,
  [-props.distance, 0, props.distance],
  [1, props.magnification, 1],
)

// 基于距离计算 Y 轴偏移
const targetY = useTransform(
  mouseDistance,
  (distance: number) => {
    const absDistance = Math.abs(distance)
    if (absDistance > props.distance)
      return 0
    // 在中心位置时向上偏移最多
    const ratio = 1 - absDistance / props.distance
    return -ratio * 4
  },
)

// 应用弹簧动画
const scale = useSpring(targetScale, props.springConfig)
const y = useSpring(targetY, props.springConfig)

// 订阅动画值的变化
onMounted(() => {
  const unsubscribeScale = scale.on('change', (latest: number) => {
    currentScale.value = latest
  })

  const unsubscribeY = y.on('change', (latest: number) => {
    currentY.value = latest
  })

  onUnmounted(() => {
    unsubscribeScale()
    unsubscribeY()
  })
})

const isActive = computed(() => route.path === props.item.to)
</script>

<template>
  <div
    ref="itemRef"
    class="flex items-center justify-center"
    :style="{
      transform: `scale(${currentScale}) translateY(${currentY}px)`,
      transformOrigin: 'bottom center',
    }"
  >
    <NuxtLink
      :to="item.to"
      :title="item.title"
      class="flex items-center justify-center rounded-full p-2 text-zinc-700 op70 transition-colors duration-300 dark:text-zinc-300 hover:op100"
      :class="isActive ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/40'"
    >
      <div class="text-lg" :class="[item.icon]" />
    </NuxtLink>
  </div>
</template>
