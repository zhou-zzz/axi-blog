<script setup lang="ts">
import { Motion } from 'motion-v'
import { ref } from 'vue'

const isHovering = ref(false)

const hoverAnimation = {
  scale: 1,
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
}

const imageAnimation = {
  scale: 1.3,
  y: -40,
  x: 20,
  transition: {
    type: 'spring',
    stiffness: 700,
    damping: 15,
  },
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}
</script>

<template>
  <div class="relative">
    <Motion
      :animate="{ scale: 1 }"
      :hover="hoverAnimation"
      class="h-36 w-36 cursor-pointer border-2 border-gray-700 rounded-full bg-white shadow-md lt-sm:hidden dark:border-gray-200 hover:border-blue-500 dark:bg-white dark:op80 hover:op100 dark:hover:border-blue-400 dark:hover:shadow-blue-500/20"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="h-full w-full rounded-full" :class="[isHovering ? 'overflow-visible' : 'overflow-hidden']">
        <Motion
          :animate="{ scale: 1, y: 0 }"
          :hover="imageAnimation"
          class="h-full w-full"
        >
          <img
            src="@@/public/img/avatar.png"
            alt="Avatar"
            class="h-full w-full object-cover"
          >
        </Motion>
      </div>
    </Motion>
    <div
      class="h-36 w-36 overflow-hidden border-2 border-gray-700 rounded-full bg-white shadow-md lt-sm:block sm:hidden dark:border-gray-200 dark:bg-white dark:op80"
    >
      <img
        src="@@/public/img/avatar.png"
        alt="Avatar"
        class="h-full w-full object-cover"
      >
    </div>
  </div>
</template>
