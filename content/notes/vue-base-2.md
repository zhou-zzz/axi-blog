---
title: Vue基础2
date: 2025-05-16
tags: ['Vue3']
description: 'Vue基础'
category: 'note'
---

# Vue基础2笔记精简版

## 事件处理

Vue提供两种事件处理方式：
- **内联事件处理器**：直接在模板中执行JavaScript语句
- **方法事件处理器**：调用组件中定义的方法

### 事件修饰符示例

```vue
<!-- 事件修饰符演示 -->
<script setup>
import { ref } from 'vue'

const formData = ref({ name: '' })

function handleClick() {
  alert('点击事件不会冒泡')
}

function handleSubmit() {
  alert(`表单提交：${formData.value.name}`)
}

function handleSelfClick() {
  alert('只有点击div本身才会触发')
}
</script>

<template>
  <div class="event-demo">
    <!-- 阻止事件传播 -->
    <button @click.stop="handleClick">
      阻止冒泡
    </button>

    <!-- 阻止默认行为 -->
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" type="text">
      <button type="submit">
        提交
      </button>
    </form>

    <!-- 自我触发 -->
    <div class="self-area" @click.self="handleSelfClick">
      点击此区域（不含子元素）触发
      <span>点击我不会触发父元素事件</span>
    </div>
  </div>
</template>
```

## 表单输入绑定

`v-model`是双向绑定的语法糖，简化了表单输入处理。

### 基础用法与修饰符

```vue
<script setup>
import { ref } from 'vue'

const message = ref('')
const trimmedMessage = ref('')
const age = ref(18)
</script>

<template>
  <div class="form-demo">
    <!-- 基础用法 -->
    <div class="form-item">
      <label>文本输入：</label>
      <input v-model="message" placeholder="输入文本">
      <p>输入内容：{{ message }}</p>
    </div>

    <!-- 修饰符 -->
    <div class="form-item">
      <label>自动去除空格：</label>
      <input v-model.trim="trimmedMessage" placeholder="前后空格会被去除">
      <p>处理后内容：「{{ trimmedMessage }}」</p>
    </div>

    <div class="form-item">
      <label>数字输入：</label>
      <input v-model.number="age" type="number">
      <p>年龄 ({{ typeof age }}): {{ age }}</p>
    </div>
  </div>
</template>
```

### 组件v-model

Vue3中组件可以使用`defineModel()`简化v-model实现：

```vue
<!-- Child.vue -->
<script setup>
</script>

<script setup>
import { ref } from 'vue'
import Counter from './Counter.vue'
const model = defineModel()

function increment() {
  model.value++
}

const count = ref(0)
</script>

<!-- Parent.vue -->
<template>
  <div class="counter-component">
    <p>父组件绑定值: {{ model }}</p>
    <button @click="increment">
      增加
    </button>
  </div>
</template>

<template>
  <div>
    <h2>父组件</h2>
    <p>计数: {{ count }}</p>
    <Counter v-model="count" />
  </div>
</template>
```

## 侦听器

Vue提供两种侦听响应式数据变化的方式：`watch`和`watchEffect`。

### watch示例

```vue
<script setup>
import { reactive, ref, watch } from 'vue'

const user = reactive({
  name: '张三',
  age: 25
})

const logs = ref([])

// 侦听整个响应式对象
watch(
  () => user,
  (newValue, oldValue) => {
    logs.value.push(`整体变化: ${JSON.stringify(oldValue)} -> ${JSON.stringify(newValue)}`)
  },
  { deep: true }
)

// 侦听特定属性
watch(
  () => user.name,
  (newName, oldName) => {
    logs.value.push(`名字变化: ${oldName} -> ${newName}`)
  }
)

watch(
  () => user.age,
  (newAge, oldAge) => {
    logs.value.push(`年龄变化: ${oldAge} -> ${newAge}`)
  }
)
</script>

<template>
  <div class="watch-demo">
    <h3>用户信息</h3>
    <div>
      <label>姓名：</label>
      <input v-model="user.name">
    </div>
    <div>
      <label>年龄：</label>
      <input v-model.number="user.age" type="number">
    </div>

    <div class="log-area">
      <h4>变更日志：</h4>
      <ul>
        <li v-for="(log, index) in logs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

### watchEffect示例

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const searchQuery = ref('')
const results = ref([])
const loading = ref(false)

// 模拟API调用
function searchAPI(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = ['苹果', '香蕉', '橙子', '葡萄', '西瓜']
      const filtered = items.filter(item => item.includes(query))
      resolve(filtered)
    }, 500)
  })
}

// 使用watchEffect自动执行搜索
const stopWatch = watchEffect(async () => {
  if (searchQuery.value) {
    loading.value = true
    results.value = await searchAPI(searchQuery.value)
    loading.value = false
  }
  else {
    results.value = []
  }
})

// 组件卸载时停止侦听
onUnmounted(() => {
  stopWatch()
})
</script>

<template>
  <div class="effect-demo">
    <h3>自动搜索</h3>
    <input
      v-model="searchQuery"
      placeholder="输入搜索内容"
    >

    <div v-if="loading" class="loading">
      搜索中...
    </div>

    <div v-else class="results">
      <h4>搜索结果：</h4>
      <p v-if="results.length === 0">
        无匹配结果
      </p>
      <ul v-else>
        <li v-for="(item, index) in results" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

## 模板引用

通过`ref`属性获取DOM元素或子组件实例。

```vue
<script setup>
import { onMounted, ref } from 'vue'

const colors = ref(['red', 'green', 'blue', 'purple'])

// 单个元素引用
const inputRef = ref(null)

function focusInput() {
  inputRef.value.focus()
}

// 多个元素引用
const colorItems = ref([])

function logColorItems() {
  console.log('颜色元素:', colorItems.value)
  alert(`共有 ${colorItems.value.length} 个颜色元素`)
}

onMounted(() => {
  // 组件挂载后自动聚焦
  inputRef.value.focus()
})
</script>

<template>
  <div class="template-ref-demo">
    <h3>模板引用示例</h3>

    <!-- 单个元素引用 -->
    <input ref="inputRef" placeholder="点击按钮聚焦">
    <button @click="focusInput">
      聚焦输入框
    </button>

    <!-- 多个元素引用 -->
    <h4>颜色列表：</h4>
    <ul>
      <li
        v-for="(color, index) in colors"
        :key="index"
        ref="colorItems"
        :style="{ color }"
      >
        {{ color }}
      </li>
    </ul>
    <button @click="logColorItems">
      打印颜色元素
    </button>
  </div>
</template>
```

## 组件通信

### Props和事件

```vue
<!-- ChildComponent.vue -->
<script setup>
</script>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['response'])

function sendToParent() {
  emit('response', '这是来自子组件的回复')
}

const parentMessage = ref('你好，子组件！')
const childResponse = ref('')

function handleChildResponse(message) {
  childResponse.value = message
}
</script>

<!-- ParentComponent.vue -->
<template>
  <div class="child-component">
    <h3>子组件</h3>
    <p>接收到的消息: {{ message }}</p>
    <button @click="sendToParent">
      发送事件到父组件
    </button>
  </div>
</template>

<template>
  <div class="parent-component">
    <h2>父组件</h2>
    <input v-model="parentMessage" placeholder="输入发送给子组件的消息">
    <p v-if="childResponse">子组件回复: {{ childResponse }}</p>

    <ChildComponent
      :message="parentMessage"
      @response="handleChildResponse"
    />
  </div>
</template>
```

### 动态组件

```vue
<script setup>
import { ref, shallowRef } from 'vue'
import TabArchive from './TabArchive.vue'
import TabHome from './TabHome.vue'
import TabPosts from './TabPosts.vue'

// 使用shallowRef优化性能
const tabs = shallowRef([
  { name: '首页', component: TabHome },
  { name: '文章', component: TabPosts },
  { name: '归档', component: TabArchive }
])

const currentTab = ref(0)
</script>

<template>
  <div class="dynamic-component-demo">
    <h3>动态组件示例</h3>

    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === index }"
        @click="currentTab = index"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="tab-content">
      <component :is="tabs[currentTab].component" />
    </div>
  </div>
</template>
```

## 生命周期钩子

Vue组件生命周期包括创建、挂载、更新和卸载阶段，每个阶段都有对应的钩子函数。

```vue
<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import LifecycleChild from './LifecycleChild.vue'
</script>

<script setup>
const message = ref('Hello')
const status = ref('初始化')
const updateCount = ref(0)
const visible = ref(true)

function toggleVisible() {
  visible.value = !visible.value
  status.value = visible.value ? '已重新挂载' : '已卸载'
}

onMounted(() => {
  status.value = '已挂载'
  console.log('父组件已挂载')
})

const props = defineProps(['message'])

// 挂载阶段
onBeforeMount(() => {
  console.log('子组件 - 挂载前')
})

onMounted(() => {
  console.log('子组件 - 已挂载')
})

// 更新阶段
onBeforeUpdate(() => {
  console.log('子组件 - 更新前')
})

onUpdated(() => {
  console.log('子组件 - 已更新')
})

// 卸载阶段
onBeforeUnmount(() => {
  console.log('子组件 - 卸载前')
})

onUnmounted(() => {
  console.log('子组件 - 已卸载')
})
</script>

<!-- LifecycleChild.vue -->
<template>
  <div class="lifecycle-demo">
    <h3>生命周期演示</h3>
    <p>组件状态: {{ status }}</p>
    <p>更新次数: {{ updateCount }}</p>

    <input v-model="message" placeholder="修改触发更新">
    <button @click="toggleVisible">
      {{ visible ? '卸载' : '重新挂载' }}
    </button>

    <div v-if="visible" class="child-wrapper">
      <LifecycleChild :message="message" />
    </div>
  </div>
</template>

<template>
  <div class="lifecycle-child">
    <h4>子组件</h4>
    <p>接收到的消息: {{ message }}</p>
  </div>
</template>
```

Vue生命周期图示：

::prose-image{src="/img/note/lifecycle.png"}
::
