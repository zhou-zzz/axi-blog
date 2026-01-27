<script setup lang="ts">
import type { VariantType } from 'motion-v'
import { Motion } from 'motion-v'

const hoverAnimation = {
  scale: 1,
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
}

const imageAnimation: VariantType = {
  scale: 1.3,
  y: -40,
  x: 20,
  transition: {
    type: 'spring',
    stiffness: 700,
    damping: 15,
  },
}
</script>

<template>
  <div class="relative">
    <Motion
      :animate="{ scale: 1 }"
      :hover="hoverAnimation"
      class="avatar-container group h-36 w-36 cursor-pointer border-2 border-gray-700 rounded-full bg-white shadow-md lt-sm:hidden dark:border-gray-200 hover:border-blue-500 dark:bg-white dark:op80 hover:op100 dark:hover:border-blue-400 dark:hover:shadow-blue-500/20"
    >
      <div class="h-full w-full overflow-hidden rounded-full group-hover:overflow-visible">
        <Motion
          :animate="{ scale: 1, y: 0 }"
          :hover="imageAnimation"
          class="h-full w-full"
        >
          <NuxtImg
            src="/img/avatar.png"
            alt="Avatar"
            class="h-full w-full object-cover"
            format="webp"
            quality="80"
          />
        </Motion>
      </div>
    </Motion>
    <div
      class="h-36 w-36 overflow-hidden border-2 border-gray-700 rounded-full bg-white shadow-md lt-sm:block sm:hidden dark:border-gray-200 dark:bg-white dark:op80"
    >
      <NuxtImg
        src="/img/avatar.png"
        alt="Avatar"
        class="h-full w-full object-cover"
        format="webp"
        quality="80"
      />
    </div>
  </div>
</template>
