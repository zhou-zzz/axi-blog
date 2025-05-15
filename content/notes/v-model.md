---
title: v-model使用技巧
date: 2025-05-07
tags: ['v-model', 'computed', 'Vue3']
description: '深入理解Vue3中v-model的使用与二次封装组件实现双向绑定'
category: 'note'
---

## 1、背景

在 Vue3 中，`v-model` 是一种用于实现双向绑定的语法糖。当我们需要二次封装第三方组件（如 Vant 的 Popup）并保持 `v-model` 的功能时，需要正确处理组件的 props 和 events。

### Vue3中v-model的变化

- 默认 prop 从 `value` 改为 `modelValue`
- 默认事件从 `input` 改为 `update:modelValue`
- 可以在同一组件上使用多个 `v-model` 绑定不同的 prop

## 2、基本使用

### 父组件中使用自定义组件

```vue
<script setup>
import { ref } from 'vue'
import MyPopup from './MyPopup.vue'

const showPopup = ref(false)
</script>

<template>
  <MyPopup v-model="showPopup">
    弹窗内容
  </MyPopup>
</template>
```

### 自定义组件实现

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const innerVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <van-popup v-model:show="innerVisible" v-bind="$attrs">
    <slot />
  </van-popup>
</template>
```

:::tip
注意这里是通过自定义computed的set和get实现双向绑定，这是实现组件二次封装时保持v-model功能的关键
:::

## 3、进阶用法

### 3.1、多个v-model绑定

Vue3支持在同一组件上使用多个v-model，例如同时绑定可见状态和表单数据：

```vue
<!-- 父组件 -->
<script setup>
import { reactive, ref } from 'vue'
import UserForm from './UserForm.vue'

const showForm = ref(false)
const userData = reactive({
  username: '',
  email: ''
})
</script>

<template>
  <UserForm
    v-model:visible="showForm"
    v-model:username="userData.username"
    v-model:email="userData.email"
  />
</template>
```

```vue
<!-- 子组件 UserForm.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: Boolean,
  username: String,
  email: String
})

const emit = defineEmits(['update:visible', 'update:username', 'update:email'])

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  }
})

function closeForm() {
  emit('update:visible', false)
}
</script>

<template>
  <van-popup v-model:show="innerVisible">
    <form>
      <input
        :value="username"
        @input="$emit('update:username', $event.target.value)"
      >
      <input
        :value="email"
        @input="$emit('update:email', $event.target.value)"
      >
      <button @click="closeForm">
        提交
      </button>
    </form>
  </van-popup>
</template>
```

## 4、总结

Vue3中的v-model通过计算属性的get和set方法实现双向绑定，是组件二次封装的重要技巧。
