---
title: CSS面试复习
date: 2025-02-18
tags: ['css', 'interview']
description: css核心知识点与面试要点总结
---

## CSS 核心知识点

### 1. 选择器与优先级
- 选择器类型：
  - 标签选择器：`div`
  - 类选择器：`.class`
  - ID选择器：`#id`
  - 属性选择器：`[type="text"]`
  - 伪类选择器：`:hover`
  - 伪元素选择器：`::before`

- 优先级计算：
  - !important：最高优先级
  - 内联样式：1000
  - ID选择器：100
  - 类/属性/伪类：10
  - 标签/伪元素：1
  - 通配符：0

### 2. 盒模型
- 标准盒模型：`box-sizing: content-box`
  - width/height 只包含内容区
  - 总宽度 = width + padding + border + margin

- IE盒模型：`box-sizing: border-box`
  - width/height 包含内容区、padding 和 border
  - 总宽度 = width + margin

### 3. 布局方式
#### Flex布局
```css
.container {
  display: flex;
  justify-content: center;     /* 主轴对齐 */
  align-items: center;         /* 交叉轴对齐 */
  flex-direction: row;         /* 主轴方向 */
  flex-wrap: wrap;            /* 换行方式 */
}

.item {
  flex: 1;                    /* flex-grow, flex-shrink, flex-basis */
  order: 1;                   /* 排列顺序 */
}
```

#### Grid布局
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}

.item {
  grid-column: span 2;
  grid-row: 1 / 3;
}
```

### 4. 定位与层叠
- 定位方式：
  - static：默认定位
  - relative：相对定位
  - absolute：绝对定位
  - fixed：固定定位
  - sticky：粘性定位

- z-index：
  - 只对定位元素生效
  - 受父元素层叠上下文影响

### 5. 响应式设计
```css
/* 媒体查询 */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* 响应式单位 */
.container {
  width: 90vw;
  font-size: 1rem;
  padding: 2em;
}

/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
}
```

### 6. CSS3新特性
- 转换与动画：
```css
/* 转换 */
.element {
  transform: translate(50px) rotate(45deg) scale(1.5);
  transition: all 0.3s ease;
}

/* 动画 */
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.animated {
  animation: slide 2s infinite;
}
```

### 7. 性能优化
- 选择器优化：
  - 避免过度嵌套
  - 使用类选择器替代标签选择器
  - 避免使用通配符

- 渲染性能：
  - 使用 transform 代替位置调整
  - 使用 opacity 代替 visibility
  - 避免大量使用 box-shadow

- 文件优化：
  - 合并CSS文件
  - 压缩CSS代码
  - 使用CSS Sprites

### 8. 常见面试题

#### BFC (Block Formatting Context)
- 触发条件：
  - float 不为 none
  - position 为 absolute 或 fixed
  - display 为 inline-block、flex、grid
  - overflow 不为 visible

- 应用场景：
  - 清除浮动
  - 防止 margin 重叠
  - 自适应两栏布局

#### 清除浮动的方法
```css
/* 方法1：清除浮动 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 方法2：BFC */
.container {
  overflow: hidden;
}
```

#### 居中方案
```css
/* Flex方案 */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid方案 */
.parent {
  display: grid;
  place-items: center;
}

/* 绝对定位方案 */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 移动端适配
```css
/* rem适配 */
html {
  font-size: calc(100vw / 375 * 10);
}

.element {
  width: 10rem;
}

/* vw适配 */
.element {
  width: 50vw;
  font-size: 4vw;
}
```
