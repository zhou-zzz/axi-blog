---
title: HTML面试复习
date: 2025-02-17
tags: ['html', 'interview']
description: HTML核心知识点与面试要点总结
---

## HTML 基础知识

### 1. 语义化标签
- 优点：
  - 代码可读性更好
  - 有利于 SEO
  - 便于团队开发和维护
  - 支持多设备访问

- 常用语义化标签：
  - `<header>`: 页头
  - `<nav>`: 导航
  - `<main>`: 主要内容
  - `<article>`: 文章
  - `<section>`: 区块
  - `<aside>`: 侧边栏
  - `<footer>`: 页脚

### 2. Meta标签
- 常用meta标签：
  ```html
  <!-- 字符编码 -->
  <meta charset="UTF-8">

  <!-- 视口设置 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO相关 -->
  <meta name="description" content="页面描述">
  <meta name="keywords" content="关键词">
  ```

### 3. 重要概念

#### DOCTYPE的作用
- 声明文档类型
- 决定浏览器渲染模式
- HTML5的声明方式：`<!DOCTYPE html>`

#### 行内元素与块级元素
- 块级元素：
  - 独占一行
  - 可设置宽高
  - 例如：div, p, h1-h6

- 行内元素：
  - 不换行
  - 不可设置宽高
  - 例如：span, a, img

### 4. 表单与交互

#### 表单元素
```html
<form>
  <!-- 文本输入 -->
  <input type="text">

  <!-- 密码输入 -->
  <input type="password">

  <!-- 单选框 -->
  <input type="radio">

  <!-- 复选框 -->
  <input type="checkbox">

  <!-- 下拉选择 -->
  <select>
    <option>选项1</option>
  </select>

  <!-- 文本域 -->
  <textarea></textarea>
</form>
```

#### HTML5新特性
- 新的表单类型：
  - email
  - url
  - number
  - range
  - date
  - color

- 新的表单属性：
  - required
  - placeholder
  - pattern
  - autocomplete

### 5. 性能优化

#### 加载优化
- 资源压缩
```javascript
// 代码压缩
- JavaScript 压缩：去除空格、注释、变量名简化
- CSS 压缩：合并相同规则、去除无用代码
- HTML 压缩：去除多余空格和注释

// 图片压缩
- 使用适当的图片格式（WebP、AVIF）
- 根据设备分辨率提供不同尺寸
- 使用 tinypng 等工具压缩

// Gzip 压缩
- Nginx 配置
gzip on;
gzip_types text/plain text/css application/javascript;
gzip_min_length 1k;
```
- 懒加载
```javascript
// 图片懒加载
<img data-src="large-image.jpg" loading="lazy">

// 自定义懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

// 组件懒加载
const MyComponent = React.lazy(() => import('./MyComponent'));
<Suspense fallback={<Loading />}>
  <MyComponent />
</Suspense>
```
- 预加载
```js
// 资源预加载
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="main.js" as="script">

// DNS预解析
<link rel="dns-prefetch" href="//example.com">

// 预连接
<link rel="preconnect" href="https://example.com">

// 预渲染
<link rel="prerender" href="next-page.html">
```
- CDN加速
```js
// CDN配置
-使用多域名CDN
- 选择合适的CDN节点
- 配置缓存策略

// 静态资源CDN
- 将静态资源上传到CDN
- 使用CDN域名访问资源
- 配置跨域访问

// CDN回源策略
- 配置合适的缓存时间
- 设置回源HOST
- 启用HTTPS加速
```

#### 渲染优化

1. CSS放头部
```html
<!-- 正确示例 -->
<head>
  <link rel="stylesheet" href="style.css">
</head>
```
原因：
- 避免页面闪烁（FOUC）
- CSS阻塞渲染，提前加载更快展示样式
- 让浏览器尽早构建CSSOM

2. JS放底部
```html
<!-- 正确示例 -->
<body>
  <!-- 页面内容 -->
  <script src="main.js"></script>
</body>
```
原因：
- JS会阻塞DOM解析和渲染
- 避免JS执行阻塞页面加载
- 确保页面内容优先展示

3. 避免内联样式
```html
<!-- 不推荐 -->
<div style="width: 100px; height: 100px; background: red;"></div>

<!-- 推荐 -->
<div class="box"></div>
<style>
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```
原因：
- 提高代码可维护性
- 利用CSS缓存
- 避免样式重复

4. 减少重排重绘
```javascript
// 不推荐
const el = document.getElementById('box')
el.style.width = '100px' // 触发重排
el.style.height = '100px' // 触发重排
el.style.margin = '10px' // 触发重排

// 推荐方式一：批量修改样式
el.style.cssText = 'width: 100px; height: 100px; margin: 10px;'

// 推荐方式二：使用 class
el.classList.add('box-style')

// 推荐方式三：使用 transform 代替位置调整
el.style.transform = 'translate(10px, 20px)'
```
```
1. CSS头部加载
- 减少首屏闪烁
- 提升首屏渲染速度
- 优化用户体验

2. JS底部加载
- 首屏加载时间减少50%
- DOM解析不被阻塞
- 页面响应更快

3. 避免内联样式
- 代码维护性提升
- 缓存利用率提高
- 页面加载更快

4. 减少重排重绘
- 页面滚动更流畅
- 动画性能提升
- CPU使用率降低
```

### 6. 重要面试题

#### 1. 浏览器渲染过程
```
1. 解析 HTML 生成 DOM 树
   - 解析 HTML 标记为 DOM 节点
   - 构建 DOM 树形结构
   - 遇到 script 标签会阻塞解析

2. 解析 CSS 生成 CSSOM 树
   - 解析 CSS 文件和 style 标签
   - 计算每个节点的样式
   - 构建 CSSOM 树

3. 合并 DOM 和 CSSOM 生成渲染树（Render Tree）
   - 过滤不可见的节点（如 display: none）
   - 计算节点的样式
   - 确定节点在视口中的位置

4. 布局计算（Layout/Reflow）
   - 计算每个节点的几何信息
   - 确定元素的大小和位置
   - 处理盒模型相关的计算

5. 绘制页面（Paint）
   - 将渲染树转换为屏幕上的像素
   - 绘制文本、颜色、边框、阴影等
   - 按照图层合成最终画面

6. 渲染优化策略
   - 避免频繁的样式变更
   - 使用 transform 和 opacity 做动画
   - 避免强制同步布局
   - 使用 document fragment 批量操作 DOM
   - 使用 requestAnimationFrame 做动画

7. 关键渲染路径优化
   - CSS 文件放在 head 中
   - JavaScript 放在 body 底部
   - 使用 async/defer 加载脚本
   - 减少关键资源的数量和大小
```

#### 2. 重排（回流）和重绘
```
1. 触发重排的操作
   - 改变元素的大小、位置
   - 改变浏览器窗口大小
   - 添加/删除可见的 DOM 元素
   - 获取某些属性（offsetTop、scrollTop、clientWidth 等）

2. 触发重绘的操作
   - 改变元素的颜色
   - 改变元素的背景色
   - 改变元素的透明度
   - visibility 的变化
```
#### 3. 跨域解决方案
- CORS
- JSONP
- 代理服务器
- postMessage

```
- CORS
- 优点：标准化方案，支持所有请求方式
- 缺点：需要服务器配合，老浏览器兼容性问题

- JSONP
- 优点：兼容性好，实现简单
- 缺点：只支持 GET 请求，有安全风险

- 代理服务器
- 优点：适用所有场景，不受浏览器限制
- 缺点：需要额外服务器资源

- postMessage
- 优点：适合跨窗口通信
- 缺点：使用场景有限，需要双方页面配合
```
#### 4. 存储方案
- localStorage
- sessionStorage
- Cookie
- IndexedDB

```
- localStorage: 持久化存储用户设置、主题等
- sessionStorage: 表单数据临时保存、页面间数据传递
- Cookie: 用户认证、追踪
- IndexedDB: 离线应用、大文件存储
```
