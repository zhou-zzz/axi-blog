<script setup lang="ts">
import { Motion } from 'motion-v'
import type { Variant } from "motion-v"

const skills = [
  'Vue.js',
  'React',
  'TypeScript',
  'Node.js',
  'JavaScript',
  'Git',
  'RESTful API',
  '前端工程化',
]

const blogPosts = [
  { title: 'Vue3 组合式 API 最佳实践', link: 'https://github.com/zhou-zzz' },
  { title: 'TypeScript 高级类型技巧', link: 'https://github.com/zhou-zzz' },
  { title: '前端性能优化策略', link: 'https://github.com/zhou-zzz' },
]


const skillItem: Record<string, Variant | ((custom: number) => Variant)> = {
  hidden: { 
    opacity: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    transition: { 
      delay: i * 0.1,          // 减小延迟间隔使动画更连贯
      duration: 0.8,           // 增加持续时间使动画更平滑
      type: 'spring',
      stiffness: 70,          // 降低弹性系数使动画更柔和
      damping: 15,            // 增加阻尼使动画更自然
      mass: 0.8,              // 添加质量属性使动画更有韵律
      ease: [0.22, 1, 0.36, 1], // 使用自定义缓动函数
    },
  }),
}

// 添加微信二维码显示状态
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
          <!-- 优化社交媒体图标部分 -->
          <div class="mt-4 flex justify-center gap-4 md:justify-start">
            <a 
              href="https://github.com/zhou-zzz" 
              target="_blank" 
              class="p-2 rounded-full transition-all duration-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <div class="i-uil-github-alt text-xl" title="Github" />
            </a>
            
            <!-- 微信图标和二维码 -->
            <div class="relative">
              <div
                class="p-2 rounded-full transition-all duration-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                @mouseenter="showWechatQR = true"
                @mouseleave="showWechatQR = false"
              >
                <div class="i-ri-wechat-line text-xl" />
              </div>
              
              <!-- 微信二维码弹出层 -->
              <div 
                v-show="showWechatQR" 
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 z-10"
              >
                <div class="w-40 h-50 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                  <img src="/public/img/wx.png" class="h-full w-full object-cover" alt="">
                </div>
                <div class="absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
              </div>
            </div>
            
            <a 
              href="mailto:1635359158@qq.com" 
              target="_blank" 
              class="p-2 rounded-full transition-all duration-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
          我是阿希，软件工程专业毕业，致力于打造高性能、优雅且可扩展的前端应用。作为一名充满激情的开发者，我将技术与创意融为一体。
        </p>
        <ul class="mb-4 list-disc pl-5">
          <li class="mb-2">追求极致代码质量，深度实践前端工程化</li>
          <li class="mb-2">保持敏锐的技术嗅觉，不断探索行业前沿</li>
          <li class="mb-2">擅长跨团队协作，热衷于技术分享与知识传递</li>
        </ul>
        <p class="mb-8">
          我热衷于探索前沿技术，解决富有挑战性的问题，并将创意转化为优雅高效的代码。在持续学习与成长的旅程中，我享受着编程带来的创造力与成就感，用代码构建更美好的数字体验。
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
            class="cursor-default rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-800 font-medium shadow-sm transition-all  hover:scale-105   hover:shadow-md dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            {{ skill }}
          </Motion>
        </Motion>
      </BlurFade>

      <BlurFade :delay="0.5">
        <h2 class="mb-4 text-2xl font-bold">
          最近博客文章
        </h2>
        <ul class="mb-8 list-disc pl-5">
          <li v-for="post in blogPosts" :key="post.title" class="mb-2">
            <a 
              :href="post.link" 
              target="_blank" 
              class="text-gray-700  dark:text-gray-300  transition-colors duration-300 hover:underline"
            >
              {{ post.title }}
            </a>
          </li>
        </ul>
      </BlurFade>
    </div>
  </div>
</template>
