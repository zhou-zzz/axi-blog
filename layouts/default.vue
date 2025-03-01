<script setup lang="ts">
const color = useColorMode()
</script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <main class="max-w-3xl px-6 py-24 mx-auto">
      <slot />
    </main>
  </div>
</template>
