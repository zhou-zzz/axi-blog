---
title: NestCLI 使用指南
date: 2024-12-03
tags: ['nest', 'cli']
description: Nest.js 脚手架命令行工具详细使用说明
category: 'note'
---

# Nest CLI 完整指南

## 一、安装
```bash
pnpm install -g @nestjs/cli
```

## 二、常用命令

### 1. 创建项目
```bash
nest new project-name
```
- 支持多种包管理器选择（npm/yarn/pnpm）
- 自动初始化项目结构
- 内置基础配置

:prose-image{src="/img/nest/nest-new.png"}
::
### 2. 生成代码
```bash
# 生成基础模块
nest generate module <name>

# 生成控制器
nest generate controller <name>

# 生成服务
nest generate service <name>

# 生成完整的 CRUD 资源
nest generate resource <name>
```

生成资源时的注意事项：
- 选择 REST API 会生成完整的 RESTful 接口
- 自动注入依赖关系
- 生成相关的 DTO 和接口文件

::prose-image{src="/img/nest/transport.png"}
::

::prose-image{src="/img/nest/book.png"}
::

::prose-image{src="/img/nest/nest-generate-resource.png"}
::

### 3. 项目构建
```bash
# 使用 tsc 构建（默认）
nest build

# 使用 webpack 构建
nest build --webpack
```

### 4. 项目启动
```bash
# 开发环境启动
nest start

# 监听模式启动
nest start --watch

# 生产环境启动
nest start --prod
```

### 5. 配置文件
`nest-cli.json` 主要配置项：
```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": false
  }
}
```

### 6. 环境信息
使用 `nest info` 可查看：
- Nest CLI 版本
- Node.js 版本
- 包管理器信息
- 系统环境信息

::prose-image{src="/img/nest/nest-info.png"}
::
## 三、最佳实践
1. 使用 `generate resource` 快速搭建完整功能模块
2. 善用 CLI 的自动注入功能
3. 根据项目规模选择合适的构建工具（tsc/webpack）
