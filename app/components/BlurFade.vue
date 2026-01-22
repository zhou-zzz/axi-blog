<script setup lang="ts">
import { Motion } from 'motion-v'

interface Props {
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: string
  blur?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.4,
  delay: 0,
  yOffset: 6,
  inView: false,
  inViewMargin: '-50px',
  blur: '6px',
  className: '',
})

const isVisible = ref(false)
const elementRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!props.inView) {
    isVisible.value = true
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    {
      rootMargin: props.inViewMargin,
    },
  )

  if (elementRef.value) {
    observer.observe(elementRef.value)
  }

  return () => {
    observer.disconnect()
  }
})

const variants = {
  hidden: {
    y: props.yOffset,
    opacity: 0,
    filter: `blur(${props.blur})`,
  },
  visible: {
    y: -props.yOffset,
    opacity: 1,
    filter: 'blur(0px)',
  },
}
</script>

<template>
  <Motion
    ref="elementRef"
    :initial="variants.hidden"
    :animate="isVisible ? variants.visible : variants.hidden"
    :exit="variants.hidden"
    :transition="{
      delay: 0.04 + props.delay,
      duration: props.duration,
      ease: [0.25, 0.1, 0.25, 1],
    }"
    :class="className"
  >
    <slot />
  </Motion>
</template>
