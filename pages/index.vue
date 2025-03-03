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
  intro: '我是阿希，软件工程专业毕业，专注于构建可靠、实用的前端应用。作为一名热爱编程的开发者，我努力将技术与创意结合起来。',
  points: [
    '注重代码质量，喜欢实践前端工程化',
    '保持学习热情，关注技术发展动态',
    '乐于团队协作，喜欢分享交流技术心得',
  ],
  outro: '我喜欢探索新技术，解决实际问题，并尝试写出清晰高效的代码。在不断学习的过程中，我享受着编程带来的乐趣，希望能用自己的技能为用户创造价值。',
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
          <div class="mt-4 flex justify-center gap-4 md:justify-start">
            <a
              href="https://github.com/zhou-zzz"
              target="_blank"
              class="flex items-center justify-center rounded-full p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <div class="i-uil-github-alt text-xl" title="Github" />
            </a>

            <!-- 微信图标和二维码 -->
            <div class="relative">
              <div
                class="flex items-center justify-center rounded-full p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                @mouseenter="showWechatQR = true"
                @mouseleave="showWechatQR = false"
              >
                <div class="i-ri-wechat-line text-xl" />
              </div>

              <!-- 微信二维码弹出层 -->
              <div
                v-show="showWechatQR"
                class="absolute bottom-full left-1/2 z-10 mb-2 rounded-lg bg-white p-3 shadow-lg transition-all duration-300 -translate-x-1/2 dark:bg-gray-800"
              >
                <div class="h-50 w-40 flex items-center justify-center bg-gray-200 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  <img src="/public/img/wx.png" class="h-full w-full object-cover" alt="">
                </div>
                <div class="absolute left-1/2 h-3 w-3 rotate-45 transform bg-white -bottom-1.5 -translate-x-1/2 dark:bg-gray-800" />
              </div>
            </div>

            <a
              href="mailto:1635359158@qq.com"
              target="_blank"
              class="flex items-center justify-center rounded-full p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <div class="i-carbon-email text-xl" title="邮箱" />
            </a>
          </div>
        </BlurFade>
      </div>
    </div>

    <!-- 内容部分 -->
    <div class="mx-auto max-w-none prose dark:prose-invert">
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
            class="cursor-default rounded-full from-gray-50 to-gray-100 bg-gradient-to-r px-4 py-1.5 text-sm text-gray-800 font-medium shadow-sm transition-all hover:scale-105 dark:from-gray-800 dark:to-gray-700 dark:text-gray-200 hover:shadow-md dark:hover:from-gray-700 dark:hover:to-gray-600"
          >
            {{ skill }}
          </Motion>
        </Motion>
      </BlurFade>

      <BlurFade :delay="0.5">
        <h2 class="mb-4 text-2xl font-bold">
          最近博客文章
        </h2>
        <ul class="mb-8 list-none pl-0 space-y-4">
          <li v-for="post in recentBlog" :key="post.id" class="mb-3">
            <div class="flex flex-col rounded-md p-2 transition-all hover:bg-gray-100/80 dark:hover:bg-gray-800/50">
              <NuxtLink
                :to="post.path"
                class="text-gray-700 font-medium no-underline transition-colors duration-300 dark:text-gray-300"
              >
                {{ post.title }}
              </NuxtLink>
              <span class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
            </div>
          </li>
        </ul>
      </BlurFade>
    </div>
  </div>
</template>
