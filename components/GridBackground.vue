<template>
  <div class="fixed inset-0 -z-10">
    <div class="bg-grid-pattern h-full w-full opacity-[0.08] dark:opacity-[0.12]" />
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1.5px, transparent 1.5px),
    linear-gradient(to bottom, currentColor 1.5px, transparent 1.5px);
  background-size: 24px 24px;
}

/* 添加渐变遮罩，让网格在边缘渐隐 */
.bg-grid-pattern::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    var(--bg-color, #ffffff) 100%
  );
  opacity: 0.8; /* 降低遮罩的不透明度，让网格更明显 */
}

:root {
  --bg-color: #ffffff;
}

html.dark {
  --bg-color: #121212;
}
</style>
