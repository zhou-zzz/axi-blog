---
title: ESLint 9.x 配合 unplugin-auto-import 实现自动导入配置
date: 2025-02-25
tags: ['eslint']
description: nest文件上传
category: 'note'
---

## 1、背景
在使用 unplugin-auto-import 自动导入 Vue 相关 API 时，ESLint 会报 undefined 错误。这是因为 ESLint 无法识别自动导入的全局变量。

## 2、环境依赖
- eslint: 9.20.1
- unplugin-auto-import: 19.1.0
- vite: 6.1.0

## 3、eslint9配置unplugin-auto-import
在vite配置
```ts
AutoImport({
  imports: ['vue', 'vue-router', 'pinia'],
  dts: 'src/auto-imports.d.ts',
  // 添加以下配置
  eslintrc: {
    enabled: true, // 启用 ESLint 配置生成
    filepath: './.eslintrc-auto-import.json', // 生成的配置文件路径
    globalsPropValue: true // 允许配置全局变量
  }
})
```
在eslint配置文件中添加
```ts
import * as fs from 'node:fs'

const autoImportConfig = JSON.parse(
  fs.readFileSync('./.eslintrc-auto-import.json', 'utf8')
)

export default [
  {
    name: 'app/auto-import',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...autoImportConfig.globals
      }
    }
  }
]
```
