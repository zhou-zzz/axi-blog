<script setup lang="ts">
import type { Variant } from 'motion-v'
import { Motion } from 'motion-v'

const skills = [
  'Vue.js',
  'React',
  'TypeScript',
  'Node.js',
  'JavaScript',
  'Git',
  'WebGIS',
  '前端工程化',
]

const aboutMe = {
  intro: '我是阿希，拥有4年前端开发经验，喜欢构建用户友好的交互式应用。我喜欢前端，同时也喜欢探索和尝试新技术，不断拓展自己的技术边界。',
  points: [
    '热衷于前端最佳实践，注重代码质量和工程化',
    '积极拥抱新技术，探索 LLM 辅助编程',
    '喜欢富有创意的交互设计和流畅的动画效果',
  ],
  outro: '我享受将复杂的数据通过直观的可视化呈现出来，让用户获得良好的体验。',
}

const { data: recentBlog } = await useAsyncData('/posts', () => {
  return queryCollection('content')
    .order('date', 'DESC')
    .limit(3)
    .all()
})

const skillItem: Record<string, Variant | ((custom: number) => Variant)> = {
  hidden: {
    opacity: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      type: 'spring',
      stiffness: 70,
      damping: 15,
      mass: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const showWechatQR = ref(false)
</script>

<template>
  <Plum />
  <div class="mx-auto px-4 py-8 container">
    <div class="mb-12 flex flex-col items-center md:flex-row md:items-start md:gap-8">
      <div class="mb-6 md:mb-0">
        <Avatar />
      </div>

      <div class="flex-1">
        <BlurFade :delay="0.1">
          <h1 class="mb-2 text-center text-4xl font-bold md:text-left">
            Hi, I'm Axi 👨‍💻
          </h1>
          <p class="mb-4 text-center text-xl md:text-left">
            做一名长期主义者！
          </p>
          <!-- 社交图标部分 -->
          <div class="mt-4 flex justify-center gap-4 md:justify-start">
            <a
              href="https://github.com/zhou-zzz"
              target="_blank"
              class="flex items-center justify-center rounded-full p-2 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900/40"
            >
              <div class="i-uil-github-alt text-xl" title="Github" />
            </a>

            <div class="relative">
              <div
                class="flex items-center justify-center rounded-full p-2 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900/40"
                @mouseenter="showWechatQR = true"
                @mouseleave="showWechatQR = false"
              >
                <div class="i-ri-wechat-line text-xl" />
              </div>

              <div
                v-show="showWechatQR"
                class="absolute bottom-full left-1/2 z-10 mb-2 rounded-lg bg-white p-3 shadow-lg transition-all duration-300 -translate-x-1/2 dark:bg-zinc-800"
              >
                <div class="h-50 w-40 flex items-center justify-center bg-zinc-100 text-xs text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                  <img src="/public/img/wx.png" class="h-full w-full object-cover" alt="">
                </div>
                <div class="absolute left-1/2 h-3 w-3 rotate-45 transform bg-white -bottom-1.5 -translate-x-1/2 dark:bg-zinc-800" />
              </div>
            </div>

            <a
              href="mailto:1635359158@qq.com"
              target="_blank"
              class="flex items-center justify-center rounded-full p-2 text-zinc-700 transition-all duration-300 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900/40"
            >
              <div class="i-carbon-email text-xl" title="邮箱" />
            </a>
          </div>
        </BlurFade>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="mx-auto max-w-none">
      <BlurFade :delay="0.2">
        <h2 class="mb-4 text-2xl font-bold">
          关于我
        </h2>
        <p class="mb-4">
          {{ aboutMe.intro }}
        </p>
        <ul class="mb-4 list-disc pl-5">
          <li v-for="(point, index) in aboutMe.points" :key="index" class="mb-2">
            {{ point }}
          </li>
        </ul>
        <p class="mb-8">
          {{ aboutMe.outro }}
        </p>
      </BlurFade>

      <BlurFade :delay="0.3">
        <h2 class="mb-4 text-2xl font-bold">
          技能
        </h2>
        <Motion
          initial="hidden"
          animate="visible"
          class="mb-8 flex flex-wrap gap-3"
        >
          <Motion
            v-for="(skill, idx) in skills"
            :key="skill"
            :variants="skillItem"
            :custom="idx"
            class="cursor-default rounded-full bg-zinc-50 px-4 py-1.5 text-sm text-zinc-800 font-medium transition-all hover:scale-105 dark:bg-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            {{ skill }}
          </Motion>
        </Motion>
      </BlurFade>

      <BlurFade :delay="0.5">
        <h2 class="mb-4 text-2xl font-bold">
          最近博客文章
        </h2>
        <div class="mb-8 space-y-4">
          <div v-for="post in recentBlog" :key="post.id" class="group">
            <NuxtLink
              :to="post.path"
              class="block px-2 py-3 no-underline transition-colors duration-300 -mx-2 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              <div class="flex items-center">
                <span class="text-zinc-800 dark:text-zinc-100">
                  {{ post.title }}
                </span>
                <span class="ml rounded-sm bg-zinc-100 px-2 py-0.5 text-xs text-zinc-800 font-medium dark:bg-zinc-800 dark:text-zinc-200">{{ post.category }}</span>
              </div>
              <div class="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
                <time :datetime="post.date">{{ post.date }}</time>
              </div>
            </NuxtLink>
          </div>
        </div>
      </BlurFade>
    </div>
  </div>
</template>
