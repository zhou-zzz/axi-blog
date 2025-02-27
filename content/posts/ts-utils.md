---
title: TypeScript常用工具类型总结
date: 2025-02-21
tags: ['ts']
description: TypeScript常用工具类型总结
---

## 1、Partial<T>
- 作用：将类型 T 中所有属性变为可选。
```typescript
interface Person {
  name: string
  age: number
}

type PartialPerson = Partial<Person>
// 等价于 type PartialPerson = { name?: string; age?: number; }
```

## 2、Required<T>
- 作用：将类型 T 中所有属性变为必选。
```typescript
interface Person {
  name?: string
  age?: number
}
type RequiredPerson = Required<Person>
// 等价于 type RequiredPerson = { name: string; age: number; }
```

## 3、Readonly<T>
- 作用：将类型 T 中所有属性变为只读。
```typescript
interface Person {
  name: string
  age: number
}
type ReadonlyPerson = Readonly<Person>
// 等价于 type ReadonlyPerson = { readonly name: string; readonly age: number; }
```
## 4、Pick<T, K>
- 作用：从类型 T 中选择属性 K，返回新的类型。
```typescript
interface Person {
  name: string
  age: number
  address: string
}
type PickPerson = Pick<Person, 'name' | 'age'>
// 等价于 type PickPerson = { name: string; age: number; }
```

## 5、Record<K, T>
- 作用：创建一个类型，其属性键为 K，属性值为 T。
```typescript
type Grade = 'A' | 'B' | 'C'
type Score = number
type RecordScore = Record<Grade, Score>
// 等价于 type RecordScore = { A: number; B: number; C: number; }
```

## 6、Omit<T, K>
- 作用：从类型 T 中剔除属性 K，返回新的类型。
```typescript
interface Person {
  name: string
  age: number
  address: string
}
type OmitPerson = Omit<Person, 'age'>
// 等价于 type OmitPerson = { name: string; address: string; }
```

## 7、Exclude<T, U>
- 作用：从类型 T 中剔除可以赋值给类型 U 的类型，返回新的类型。
```typescript
type T0 = Exclude<"a" | "b" | "c", "a">
// 等价于 type T0 = "b" | "c"
```
## 8、Extract<T, U>
- 作用：从类型 T 中提取可以赋值给类型 U 的类型，返回新的类型。
```typescript
type T0 = Extract<"a" | "b" | "c", "a">
// 等价于 type T0 = "a"
```
## 9、ReturnType<T>
- 作用：获取函数 T 的返回类型。
```typescript
function add(a: number, b: number): number {
  return a + b
}
type ReturnTypeAdd = ReturnType<typeof add>
// 等价于 type ReturnTypeAdd = number
```
## 10、Parameters<T>
- 作用：获取函数 T 的参数类型。
```typescript
function add(a: number, b: number): number {
  return a + b
}
type ParametersAdd = Parameters<typeof add>
// 等价于 type ParametersAdd = [number, number]
```

## 11、NonNullable<T>
- 作用：从类型 T 中剔除 null 和 undefined，返回新的类型。
```typescript
type T0 = NonNullable<string | number | undefined>
// 等价于 type T0 = string | number
```

## 12、Awaited<T>
- 作用：获取 Promise<T> 的返回类型。
```typescript
async function getPromise(): Promise<string> {
  return 'Hello, World!'
}
type AwaitedPromise = Awaited<ReturnType<typeof getPromise>>
// 等价于 type AwaitedPromise = string
```
## 总结
### 1. 属性修饰类
- `Partial<T>`: 属性可选化
- `Required<T>`: 属性必选化
- `Readonly<T>`: 属性只读化

### 2. 属性筛选类
- `Pick<T, K>`: 选取属性
- `Omit<T, K>`: 剔除属性
- `Record<K, T>`: 创建属性映射

### 3. 联合类型操作
- `Exclude<T, U>`: 类型排除
- `Extract<T, U>`: 类型提取
- `NonNullable<T>`: 去除 null/undefined

### 4. 函数类型操作
- `ReturnType<T>`: 获取返回值类型
- `Parameters<T>`: 获取参数类型
- `Awaited<T>`: 获取 Promise 返回类型
