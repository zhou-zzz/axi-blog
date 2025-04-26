---
title: simple-git-hooks 和 lint-staged 优化前端工作流
date: 2025-04-26
tags: ['git', 'frontend', 'tooling']
description: 使用 simple-git-hooks 和 lint-staged 优化前端工作流
category: 'blog'
---

# 使用 simple-git-hooks 和 lint-staged 优化前端工作流

在前端开发中，保持代码质量和一致性是非常重要的。Git hooks 提供了一种在特定 Git 事件发生时自动执行脚本的方法，而 lint-staged 则允许我们只对暂存区的文件运行 linters。这篇文章将介绍如何使用 simple-git-hooks 和 lint-staged 来优化你的前端工作流。

## 什么是 Git Hooks？

Git hooks 是在 Git 仓库中特定事件发生时触发的脚本。例如，`pre-commit` hook 在提交代码前运行，可以用来检查代码质量；`pre-push` hook 在推送代码前运行，可以用来运行测试等。

Git hooks 可以帮助我们：
- 确保提交的代码符合团队的代码规范
- 防止有问题的代码被提交到仓库
- 自动化一些重复性的任务

## simple-git-hooks 介绍

[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) 是一个轻量级的工具，用于管理 Git hooks。相比于 husky，它更加简单，配置更少，性能更好。

### 安装 simple-git-hooks

```bash
pnpm add simple-git-hooks
```

## lint-staged 介绍

[lint-staged](https://github.com/okonet/lint-staged) 是一个在 git 暂存文件上运行 linters 的工具。它只会对你即将提交的文件运行 lint 检查，而不是整个项目，这样可以大大提高效率。

### 安装 lint-staged

```bash
pnpm add lint-staged
```

## 配置 simple-git-hooks 和 lint-staged

### 在 package.json 中配置

在 `package.json` 中添加以下配置：

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,less}": [
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```

### 或者使用独立配置文件

也可以创建独立的配置文件：

**.simple-git-hooks.js**:
```js
export default {
  'pre-commit': 'npx lint-staged',
  'pre-push': 'npm run test'
}
```

**lint-staged.config.js**:
```js
export default {
  '*.{js,ts,vue}': [
    'eslint --fix',
    'prettier --write'
  ],
  '*.{css,scss,less}': [
    'prettier --write'
  ],
  '*.md': [
    'prettier --write'
  ]
}
```

## 初始化 Git Hooks

配置完成后，需要初始化 Git hooks：

```bash
npx simple-git-hooks
```

这个命令会在 `.git/hooks` 目录下创建相应的 hook 文件。

## 实际应用场景

### 场景一：代码格式化和 Lint 检查

当你提交代码时，simple-git-hooks 会触发 pre-commit hook，然后 lint-staged 会对暂存区的文件进行 ESLint 和 Prettier 检查，确保代码符合规范。

### 场景二：提交前运行测试

你可以配置 pre-commit hook 来运行测试，确保提交的代码不会破坏现有功能：

```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged && pnpm run test:unit"
  }
}
```

### 场景三：自定义验证规则

你可以创建自定义脚本来验证提交信息格式：

```json
{
  "simple-git-hooks": {
    "commit-msg": "node scripts/verify-commit-msg.js"
  }
}
```

**scripts/verify-commit-msg.js**:
```js
const fs = require('node:fs')
const msgPath = process.argv[2]
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(?:feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release): .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error('无效的提交信息格式，请使用正确的格式：')
  console.error('feat: 添加了新功能')
  console.error('fix: 修复了bug')
  process.exit(1)
}
```

## 与 ESLint 和 Prettier 集成

为了获得最佳效果，你应该将 simple-git-hooks 和 lint-staged 与 ESLint 和 Prettier 集成：

```bash
pnpm add eslint prettier eslint-config-prettier
```

然后配置 `eslint.config.js` 和 `.prettierrc.js` 文件。

## 性能优化技巧

1. **只对必要的文件运行检查**：在 lint-staged 配置中，只对特定类型的文件运行相应的检查工具。

2. **使用缓存**：ESLint 和其他工具通常支持缓存，可以大大提高性能：
   ```json
   {
     "lint-staged": {
       "*.{js,ts,vue}": [
         "eslint --fix --cache"
       ]
     }
   }
   ```

3. **并行运行任务**：如果有多个独立的检查任务，可以考虑并行运行：
   ```json
   {
     "scripts": {
       "lint:parallel": "npm-run-all --parallel lint:*"
     }
   }
   ```

## 总结

使用 simple-git-hooks 和 lint-staged 可以帮助你：
- 确保代码质量和一致性
- 提高团队协作效率
- 自动化代码检查和格式化
- 防止有问题的代码被提交

这些工具是现代前端开发工作流中不可或缺的一部分，可以帮助你和你的团队保持高质量的代码库。

## 参考资源

- [simple-git-hooks GitHub 仓库](https://github.com/toplenboren/simple-git-hooks)
- [lint-staged GitHub 仓库](https://github.com/okonet/lint-staged)
- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
