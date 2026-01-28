---
title: Node.js 运行机制与事件循环
date: 2026-01-28
tags: ['Node.js', 'Event Loop']
description: '深入理解 Node.js 的核心架构、事件循环机制、微任务与宏任务的执行顺序'
category: 'note'
---

## 核心架构

Node.js 基于以下核心组件：

```
┌─────────────────────────────────────┐
│           JavaScript 代码            │
├─────────────────────────────────────┤
│              V8 引擎                 │  ← 执行 JS 代码
├─────────────────────────────────────┤
│           Node.js Bindings          │  ← JS 与 C++ 的桥梁
├─────────────────────────────────────┤
│    libuv    │   c-ares  │  OpenSSL  │  ← 异步 I/O、DNS、加密
└─────────────────────────────────────┘
```

## 事件循环（Event Loop）

事件循环是 Node.js 处理非阻塞 I/O 的核心机制。它分为 **6 个阶段**：

```
   ┌───────────────────────────┐
┌─>│         timers            │  ← setTimeout/setInterval 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  ← 系统级回调（如 TCP 错误）
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  ← 内部使用
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          poll             │  ← 获取新 I/O 事件，执行 I/O 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │          check            │  ← setImmediate 回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  ← socket.on('close') 等
   └───────────────────────────┘
```

### 各阶段详解

| 阶段 | 执行内容 |
|------|----------|
| **timers** | 执行到期的 `setTimeout` 和 `setInterval` 回调 |
| **pending callbacks** | 执行延迟到下一轮的 I/O 回调 |
| **poll** | 检索新 I/O 事件，执行 I/O 相关回调（几乎所有回调） |
| **check** | 执行 `setImmediate` 回调 |
| **close callbacks** | 执行关闭事件回调，如 `socket.on('close')` |

## 微任务与宏任务

```javascript
// 执行顺序示例
console.log('1') // 同步

setTimeout(() => console.log('2'), 0) // 宏任务 - timers

setImmediate(() => console.log('3')) // 宏任务 - check

Promise.resolve().then(() => console.log('4')) // 微任务

process.nextTick(() => console.log('5')) // 微任务（最高优先级）

console.log('6') // 同步

// 输出: 1, 6, 5, 4, 2, 3
```

### 执行优先级

```
同步代码 > process.nextTick > Promise/queueMicrotask > 宏任务
```

**每个阶段切换前**，都会清空：

1. `process.nextTick` 队列
2. 微任务队列（Promise 等）

## 关键概念

### 1. 单线程 vs 多线程

```
主线程（单线程）        libuv 线程池（默认4个）
     │                       │
     │  ← 执行 JS 代码        │  ← 处理阻塞操作
     │                       │     - 文件 I/O
     │                       │     - DNS 查询
     │                       │     - 压缩加密
```

### 2. setTimeout vs setImmediate

```javascript
// 在主模块中，顺序不确定
setTimeout(() => console.log('timeout'), 0)
setImmediate(() => console.log('immediate'))

// 在 I/O 回调中，setImmediate 总是先执行
fs.readFile('file', () => {
  setTimeout(() => console.log('timeout'), 0)
  setImmediate(() => console.log('immediate')) // 先执行
})
```

### 3. process.nextTick 的特殊性

```javascript
// nextTick 会在当前操作完成后立即执行，优先于其他异步
function apiCall(callback) {
  process.nextTick(callback) // 保证异步执行
}
```

> **注意**: 过度使用 `nextTick` 会阻塞事件循环。

## 实际应用示例

```javascript
const fs = require('node:fs')

console.log('开始')

fs.readFile('file.txt', () => {
  console.log('I/O 完成')

  setTimeout(() => console.log('timeout'), 0)
  setImmediate(() => console.log('immediate'))

  process.nextTick(() => console.log('nextTick'))
  Promise.resolve().then(() => console.log('promise'))
})

console.log('结束')

// 输出:
// 开始
// 结束
// I/O 完成
// nextTick
// promise
// immediate
// timeout
```

## 总结

- Node.js 通过**事件循环 + 非阻塞 I/O** 实现高并发
- 事件循环有 6 个阶段，按顺序循环执行
- 微任务（nextTick、Promise）在每个阶段切换时清空
- I/O 密集型操作由 libuv 线程池处理，不阻塞主线程
