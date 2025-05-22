---
title: Vue Router 4  + Pinia 实现RBAC动态路由权限系统
date: 2025-05-22
tags: ['RBAC', '动态路由权限']
description: Vue Router 4  + Pinia 实现RBAC动态路由权限系统
category: 'blog'
---

# Vue Router 4  + Pinia 实现RBAC动态路由权限系统

## RBAC

RBAC（Role-Based Access Control）：基于用户“角色”来决定可访问的页面和功能。

基本模型
用户（User） → 角色（Role） → 权限（Permission） → 路由或按钮等资源

## 项目结构设计（核心目录）

```bash
src/
├─ router/               # 路由配置
│  ├─ constant-routes.ts  # 固定路由（如登录、404）
│  ├─ async-routes.ts     # 需要权限的动态路由
│  └─ index.ts           # 路由初始化 + 权限守卫
├─ stores/
│  └─ user.ts            # 用户状态（角色、权限等）
├─ utils/
│  └─ permission.ts      # 路由过滤核心逻辑

```

## 配置路由

```ts
// constant-routes.ts
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true }
  }
]
```

```ts
// async-routes.ts
export const asyncRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/default.vue'),
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/admin/dashboard.vue'),
        meta: { title: '仪表盘', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/editor',
    component: () => import('@/layouts/default.vue'),
    meta: { roles: ['editor'] },
    children: [
      {
        path: 'articles',
        component: () => import('@/views/editor/articles.vue'),
        meta: { title: '文章管理', roles: ['editor'] }
      }
    ]
  }
]
```

## 过滤函数
```ts
// utils/permission.ts
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }

    if (!tmp.meta?.roles || roles.some(role => tmp.meta.roles.includes(role))) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
```

## Pinia用户状态管理（登录、保存角色）
```ts
// stores/user.ts
import { asyncRoutes, } from '@/router/async-routes'
import { constantRoutes } from '@/router/constant-routes'
import { filterAsyncRoutes } from '@/utils/permission'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    roles: [] as string[],
    routes: [] as any[]
  }),
  actions: {
    async login(username: string, password: string) {
      // 模拟登录返回角色
      this.roles = username === 'admin' ? ['admin'] : ['editor']
    },
    generateRoutes() {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, this.roles)
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    }
  }
})
```
## 动态注册路由（登录后动态挂载）
```ts
// router/index.ts
import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './constant-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 权限守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.roles.length === 0) {
    await userStore.login('admin', '123456') // 模拟登录
    const asyncRoutes = await userStore.generateRoutes()

    asyncRoutes.forEach((route) => {
      router.addRoute(route)
    })

    next({ ...to, replace: true })
  }
  else {
    next()
  }
})

export default router
```

需要注意的是*next({ ...to, replace: true })*，Vue Router 4 的 addRoute() 是同步添加的，但是：

如果你已经进入了某个目标地址（即当前的 to 路由），而它在动态路由添加之前不存在，它会匹配不到 → 导致 404 或空白。

所以你必须在添加路由后，重新“跳转一次”当前目标地址，这样路由才能重新进行匹配。然后添加 replace 为 true， 这个是为了避免当前地址被重复 push 到浏览器历史栈中，否则你可能点击返回时会回到刚刚的“同一个页面”。

## 按钮级权限
```vue
<!-- 指令 v-permission -->
<button v-if="hasPermission(['admin'])">
仅管理员可见
</button>
```

```ts
// utils/permission.ts
export function hasPermission(roles: string[]) {
  const userStore = useUserStore()
  return roles.some(role => userStore.roles.includes(role))
}
```

## 总结
```md
用户登录
    ↓
获取角色信息
    ↓
根据角色过滤 asyncRoutes
    ↓
动态注册 addRoute()
    ↓
路由守卫控制访问（白名单/重定向）
```
