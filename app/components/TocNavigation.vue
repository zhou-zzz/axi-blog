<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { useToc } from '~/composables/useToc'

const props = defineProps<{
  links: TocLink[]
}>()

const { activeLink, scrollToHeading } = useToc(props.links)
</script>

<template>
  <div v-if="links && links.length > 0" class="fixed left-5 top-20 hidden h-screen self-start overflow-auto py-4 pr-4 md:block">
    <ul class="list-none space-y-2">
      <li v-for="link in links" :key="link.id" class="toc-item" :class="{ 'pl-4': link.depth > 1 }">
        <a
          :href="`#${link.id}`"
          class="block truncate py-1 transition-colors duration-300 hover:text-zinc-800 dark:hover:text-zinc-200"
          :class="[
            activeLink === link.id ? 'text-zinc-800 dark:text-zinc-200 font-medium' : 'text-zinc-600 op70 dark:text-zinc-400',
            link.depth === 1 ? 'font-medium' : '',
            link.depth === 2 ? 'ml-2' : '',
            link.depth === 3 ? 'ml-4' : '',
            link.depth === 4 ? 'ml-6' : '',
            link.depth >= 5 ? 'ml-8' : '',
          ]"
          :title="link.text"
          @click.prevent="() => scrollToHeading(link.id)"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
