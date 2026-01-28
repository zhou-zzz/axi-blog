---
title: 前端树结构操作方法总结
date: 2025-03-11
tags: ['tree', 'typescript']
description: 总结前端开发中常用的树结构操作方法，包括树与数组互转、查找、过滤等实用函数
category: 'blog'
---

# 前端树结构操作方法总结

在前端开发中，树结构是一种非常常见的数据结构，尤其在处理菜单、组织架构、文件目录等场景中经常使用。本文总结了一些常用的树结构操作方法，帮助开发者更高效地处理树形数据。

## 1. 树结构转平铺数组

将嵌套的树结构转换为一维数组，常用于扁平化处理树形数据。

```typescript
/**
 * 树节点接口定义
 */
interface TreeNode {
  [key: string]: any
  children?: TreeNode[]
}

/**
 * 树结构转平铺数组
 * @param tree 树结构数据
 * @param childrenKey 子节点键名，默认为 'children'
 * @returns 平铺后的数组
 */
function treeToArray<T extends TreeNode>(tree: T[], childrenKey: string = 'children'): Omit<T, 'children'>[] {
  const result: Omit<T, 'children'>[] = []

  function dfs(nodes: T[] | undefined, result: Omit<T, 'children'>[]): void {
    if (!nodes)
      return

    for (const node of nodes) {
      // 创建节点副本，避免修改原始数据
      const { [childrenKey]: children, ...nodeWithoutChildren } = node
      result.push(nodeWithoutChildren as Omit<T, 'children'>)

      // 递归处理子节点
      if (children && children.length > 0) {
        dfs(children as T[], result)
      }
    }
  }

  dfs(tree, result)
  return result
}

// 使用示例
interface DepartmentNode {
  id: number
  name: string
  children?: DepartmentNode[]
}

const tree: DepartmentNode[] = [
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 2, name: '小组1' },
      { id: 3, name: '小组2' }
    ]
  }
]

const array = treeToArray(tree)
// 结果: [{ id: 1, name: '部门A' }, { id: 2, name: '小组1' }, { id: 3, name: '小组2' }]
```

## 2. 平铺数组转树结构

将一维数组转换为嵌套的树结构，常用于构建树形组件数据。

```typescript
/**
 * 平铺节点接口定义
 */
interface FlatNode {
  [key: string]: any
}

/**
 * 树节点接口定义
 */
interface TreeNode extends FlatNode {
  children: TreeNode[]
}

/**
 * 平铺数组转树结构
 * @param array 平铺的数组数据
 * @param idKey ID字段名，默认为 'id'
 * @param parentIdKey 父ID字段名，默认为 'parentId'
 * @param childrenKey 子节点字段名，默认为 'children'
 * @returns 树结构数据
 */
function arrayToTree<T extends FlatNode, R extends TreeNode = T & { children: R[] }>(
  array: T[],
  idKey: string = 'id',
  parentIdKey: string = 'parentId',
  childrenKey: string = 'children'
): R[] {
  const result: R[] = []
  const map: Record<string | number, R> = {}

  // 构建节点映射
  for (const item of array) {
    map[item[idKey]] = { ...item, [childrenKey]: [] } as unknown as R
  }

  // 构建树结构
  for (const id in map) {
    const node = map[id]
    const parentId = node[parentIdKey]

    if (parentId === undefined || parentId === null || parentId === 0) {
      // 根节点
      result.push(node)
    }
    else {
      // 子节点，添加到父节点的children中
      if (map[parentId]) {
        map[parentId][childrenKey].push(node)
      }
      else {
        // 父节点不存在，作为根节点处理
        result.push(node)
      }
    }
  }

  return result
}

// 使用示例
interface DepartmentFlat {
  id: number
  name: string
  parentId: number
}

const array: DepartmentFlat[] = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '小组1', parentId: 1 },
  { id: 3, name: '小组2', parentId: 1 }
]

const tree = arrayToTree(array)
/* 结果:
[
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      { id: 2, name: '小组1', parentId: 1, children: [] },
      { id: 3, name: '小组2', parentId: 1, children: [] }
    ]
  }
]
*/
```

## 3. 树结构查找节点

在树结构中查找特定节点，常用于定位和操作树中的节点。

```typescript
/**
 * 在树中查找节点
 * @param tree 树结构数据
 * @param predicate 判断函数，返回true表示找到目标节点
 * @param childrenKey 子节点键名，默认为 'children'
 * @returns 找到的节点或null
 */
function findNodeInTree<T extends TreeNode>(
  tree: T[] | undefined,
  predicate: (node: T) => boolean,
  childrenKey: string = 'children'
): T | null {
  if (!tree)
    return null

  for (const node of tree) {
    // 判断当前节点
    if (predicate(node)) {
      return node
    }

    // 递归查找子节点
    if (node[childrenKey] && node[childrenKey].length > 0) {
      const found = findNodeInTree(node[childrenKey] as T[], predicate, childrenKey)
      if (found)
        return found
    }
  }

  return null
}

// 使用示例
interface DepartmentNode {
  id: number
  name: string
  children?: DepartmentNode[]
}

const tree: DepartmentNode[] = [
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 2, name: '小组1' },
      { id: 3, name: '小组2' }
    ]
  }
]

const node = findNodeInTree(tree, node => node.id === 3)
// 结果: { id: 3, name: '小组2' }
```

## 4. 树结构过滤

根据条件过滤树结构，保留符合条件的节点及其路径。

```typescript
/**
 * 过滤树结构
 * @param tree 树结构数据
 * @param predicate 判断函数，返回true表示保留该节点
 * @param childrenKey 子节点键名，默认为 'children'
 * @returns 过滤后的树结构
 */
function filterTree<T extends TreeNode>(
  tree: T[] | undefined,
  predicate: (node: T) => boolean,
  childrenKey: string = 'children'
): T[] {
  if (!tree)
    return []

  return tree.filter((node) => {
    // 处理子节点
    if (node[childrenKey] && node[childrenKey].length > 0) {
      const filteredChildren = filterTree(node[childrenKey] as T[], predicate, childrenKey)
      node[childrenKey] = filteredChildren as any

      // 如果子节点有匹配或当前节点匹配，则保留
      return filteredChildren.length > 0 || predicate(node)
    }

    // 叶子节点，直接判断
    return predicate(node)
  })
}

// 使用示例
interface DepartmentNode {
  id: number
  name: string
  children?: DepartmentNode[]
}

const tree: DepartmentNode[] = [
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 2, name: '小组1' },
      { id: 3, name: '小组2' }
    ]
  },
  {
    id: 4,
    name: '部门B',
    children: [
      { id: 5, name: '小组3' }
    ]
  }
]

// 过滤包含"2"的节点及其路径
const filtered = filterTree(tree, node => node.name.includes('2'))
/* 结果:
[
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 3, name: '小组2', children: [] }
    ]
  }
]
*/
```

## 5. 树结构遍历

遍历树结构的所有节点，对每个节点执行指定操作。

```typescript
/**
 * 遍历树结构
 * @param tree 树结构数据
 * @param callback 回调函数，接收当前节点和父节点
 * @param childrenKey 子节点键名，默认为 'children'
 * @param parent 父节点，内部使用
 */
function traverseTree<T extends TreeNode>(
  tree: T[] | undefined,
  callback: (node: T, parent: T | null) => void,
  childrenKey: string = 'children',
  parent: T | null = null
): void {
  if (!tree)
    return

  for (const node of tree) {
    // 执行回调
    callback(node, parent)

    // 递归处理子节点
    if (node[childrenKey] && node[childrenKey].length > 0) {
      traverseTree(node[childrenKey] as T[], callback, childrenKey, node)
    }
  }
}

// 使用示例
interface DepartmentNode {
  id: number
  name: string
  level?: number
  children?: DepartmentNode[]
}

const tree: DepartmentNode[] = [
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 2, name: '小组1' },
      { id: 3, name: '小组2' }
    ]
  }
]

// 为每个节点添加level属性
traverseTree(tree, (node, parent) => {
  node.level = parent ? parent.level! + 1 : 0
})

// 结果: 每个节点都有了level属性，表示其在树中的层级
```

## 6. 树结构节点添加/删除

在树结构中添加或删除节点。

```typescript
/**
 * 在树中添加节点
 * @param tree 树结构数据
 * @param newNode 新节点
 * @param parentId 父节点ID
 * @param idKey ID字段名，默认为 'id'
 * @param parentIdKey 父ID字段名，默认为 'parentId'
 * @param childrenKey 子节点字段名，默认为 'children'
 * @returns 是否添加成功
 */
function addNodeToTree<T extends TreeNode, K extends keyof T>(
  tree: T[] | undefined,
  newNode: T,
  parentId: T[K],
  idKey: K = 'id' as K,
  parentIdKey: keyof T = 'parentId',
  childrenKey: string = 'children'
): boolean {
  if (!tree)
    return false

  // 查找父节点
  const parent = findNodeInTree(tree, node => node[idKey] === parentId, childrenKey)

  if (parent) {
    // 确保父节点有children数组
    if (!parent[childrenKey]) {
      parent[childrenKey] = [] as any
    }

    // 添加新节点
    newNode[parentIdKey] = parentId
    ;(parent[childrenKey] as T[]).push(newNode)
    return true
  }

  return false
}

/**
 * 从树中删除节点
 * @param tree 树结构数据
 * @param nodeId 要删除的节点ID
 * @param idKey ID字段名，默认为 'id'
 * @param childrenKey 子节点字段名，默认为 'children'
 * @returns 是否删除成功
 */
function removeNodeFromTree<T extends TreeNode, K extends keyof T>(
  tree: T[] | undefined,
  nodeId: T[K],
  idKey: K = 'id' as K,
  childrenKey: string = 'children'
): boolean {
  if (!tree)
    return false

  for (let i = 0; i < tree.length; i++) {
    // 检查当前层级
    if (tree[i][idKey] === nodeId) {
      tree.splice(i, 1)
      return true
    }

    // 递归检查子节点
    if (tree[i][childrenKey] && tree[i][childrenKey].length > 0) {
      if (removeNodeFromTree(tree[i][childrenKey] as T[], nodeId, idKey, childrenKey)) {
        return true
      }
    }
  }

  return false
}

// 使用示例
interface DepartmentNode {
  id: number
  name: string
  parentId?: number
  children?: DepartmentNode[]
}

const tree: DepartmentNode[] = [
  {
    id: 1,
    name: '部门A',
    children: [
      { id: 2, name: '小组1' }
    ]
  }
]

// 添加节点
addNodeToTree(tree, { id: 3, name: '小组2' } as DepartmentNode, 1)

// 删除节点
removeNodeFromTree(tree, 2)
```

## 总结

1. **树结构转平铺数组**：适用于需要将嵌套数据扁平化展示的场景，如表格数据展示、搜索功能实现等
2. **平铺数组转树结构**：常用于后端返回扁平数据，前端需要构建树形组件的场景，如菜单、组织架构图等
3. **树结构查找节点**：在大型树结构中定位特定节点，如定位当前选中项、查找特定权限节点等
4. **树结构过滤**：根据条件筛选树节点，同时保留路径结构，适用于树形筛选、搜索高亮等功能
5. **树结构遍历**：批量处理树节点，如为节点添加属性、收集特定信息等
6. **树结构节点添加/删除**：动态修改树结构，适用于可编辑的树形组件
