---
title: Vue基础-1
date: 2025-05-15
tags: ['Vue3']
description: 'Vue基础'
category: 'note'
---

## 创建Vue应用

```js
import { createApp } from 'vue'

const app = createApp({}) // 或 createApp(App)
// 根组件：无template时使用容器innerHTML作为模板
app.mount('#app') // 返回根组件实例，应在配置后调用
```

- 应用实例可注册全局组件、指令、配置等

## 模板语法

### 插值
```vue
<p>
{{ message }}
</p> <!-- 文本插值 -->
```

### 绑定属性
```vue
<p :title="message" v-bind="obj"></p> <!-- 简写:title，v-bind可绑定对象 -->
```

### JavaScript表达式
```vue
<p>
{{ message.split('').reverse().join('') }}
</p>
```
- 支持位置：文本插值(双大括号)、指令值
- 全局属性：`app.config.globalProperties` 可定义全局对象

### 指令
指令在表达式值变化时响应式更新DOM

::prose-image{src="/img/note/directive.png"}
::

## 响应式基础

### script setup
`<script setup>` 中顶层导入和声明可直接在模板中使用

### ref与reactive

```js
// ref简化原理
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

#### DOM更新时机
- Vue在next tick更新周期缓存状态修改，周期结束后一次性应用到DOM

#### reactive局限性
- 不能代理普通类型值
- 不能替换整个对象（需保持引用不变）
- 解构会丢失响应式

#### ref细节
- 作为reactive对象属性时自动解包(浅层响应式对象不会解包)
- 新ref赋值给已有ref属性会替换旧ref
- 在响应式数组或集合类型中不会解包
- 模板中只有顶级ref属性会解包
- 作为文本插值最终值时会解包

```vue
const count = ref(0)
const object = { id: ref(1) }

{{ count + object.id }} // [object object]1
{{ object.id }} // 1 (作为最终值时解包)
```

## 计算属性
- 计算属性getter应只做计算，不应有副作用
- 不要在getter中改变状态、发异步请求或更改DOM

## 类与样式绑定
- 支持字符串、对象或数组形式

### 类绑定

#### 对象语法
```vue
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
```

#### 数组语法
```vue
<div :class="[activeClass, errorClass]"></div>
```

#### 数组与对象结合
```vue
<div :class="[isActive ? activeClass : '', { error: hasError }]"></div>
```

#### 组件上使用
```vue
<MyComponent :class="{ active: isActive }" />
<!-- 会与组件自身的class合并 -->
```

### 样式绑定

#### 对象语法
```vue
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

#### 数组语法
```vue
<div :style="[baseStyles, overridingStyles]"></div>
```

#### 自动添加前缀
```vue
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
<!-- Vue会自动选择浏览器支持的最后一个值 -->
```

## 条件渲染
- `v-if`：真实条件渲染，切换时销毁/重建组件和事件监听器
- `v-if`是惰性的：初始false不渲染，首次true才渲染
- `v-show`：始终渲染，仅切换CSS display属性
- `v-if`和`v-for`同时使用时，`v-if`优先级更高

## 列表渲染
- `v-for`默认"就地更新"：数据顺序改变时不移动DOM元素
- 适用于：渲染结果不依赖子组件状态或临时DOM状态
- 不可变数组方法(`filter()`, `concat()`, `slice()`)返回新数组，需重新赋值
