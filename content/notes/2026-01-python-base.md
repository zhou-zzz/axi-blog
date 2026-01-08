---
title: Python基础知识总结
date: 2026-01-07
tags: ['Python', '编程基础']
description: 'Python基础知识学习总结，包括数据类型、字符串、列表、条件判断、循环、函数和高级特性'
category: 'note'
---

## 1. Python基础

### 1.1. 数据类型和变量

Python中常见的数据类型包括：

- **整数**（int）：`100`, `-8080`, `0`
- **浮点数**（float）：`3.14`, `-0.01`, `1.23e9`
- **字符串**（str）：`'hello'`, `"world"`, `'''多行字符串'''`
- **布尔值**（bool）：`True`, `False`
- **空值**（None）

```python
# 变量赋值
a = 100
b = 3.14
c = 'hello'
d = True
e = None

# Python是动态类型语言，变量类型可以随时改变
a = 'hello'  # 之前是整数，现在变成字符串
```

:::tip
Python变量命名规则：
- 由字母、数字、下划线组成
- 不能以数字开头
- 区分大小写
- 不能使用Python关键字
:::

### 1.2. 字符串和编码

#### 字符串表示

```python
# 单引号
s1 = 'hello'

# 双引号
s2 = "world"

# 三引号（可换行）
s3 = '''这是
多行
字符串'''
```

#### 字符串操作

```python
# 字符串连接
s = 'hello' + ' ' + 'world'  # 'hello world'

# 字符串重复
s = 'hi' * 3  # 'hihihi'

# 字符串格式化
name = 'Python'
s = f'Hello, {name}!'  # 'Hello, Python!'
s = 'Hello, {}!'.format(name)  # 旧式格式化

# 字符串索引和切片
s = 'Python'
print(s[0])      # 'P'
print(s[-1])     # 'n' (倒数第一个)
print(s[0:3])    # 'Pyt' (切片)
print(s[:3])     # 'Pyt'
print(s[3:])     # 'hon'
```

#### 字符编码

```python
# Python 3中字符串默认使用UTF-8编码
s = '你好'
print(len(s))  # 2

# 字节串（bytes）
b = '你好'.encode('utf-8')  # b'\xe4\xbd\xa0\xe5\xa5\xbd'
s = b.decode('utf-8')  # '你好'
```

### 1.3. 使用list和tuple

#### 列表（list）

列表是可变的 ordered 序列：

```python
# 创建列表
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
list3 = []  # 空列表

# 访问元素
print(list1[0])      # 1
print(list1[-1])     # 3 (最后一个)

# 添加元素
list1.append(4)      # [1, 2, 3, 4]
list1.insert(1, 5)   # [1, 5, 2, 3, 4]

# 删除元素
list1.pop()          # 删除最后一个元素
list1.pop(1)         # 删除索引为1的元素
list1.remove(2)      # 删除值为2的元素

# 列表切片
list1 = [1, 2, 3, 4, 5]
print(list1[1:3])    # [2, 3]
print(list1[:3])     # [1, 2, 3]
print(list1[3:])     # [4, 5]

# 列表连接
list1 + list2        # [1, 2, 3, 'a', 'b', 'c']
```

#### 元组（tuple）

元组是不可变的 ordered 序列：

```python
# 创建元组
tuple1 = (1, 2, 3)
tuple2 = ('a', 'b', 'c')
tuple3 = ()          # 空元组
tuple4 = (1,)        # 单元素元组（注意逗号）

# 访问元素（与列表相同）
print(tuple1[0])     # 1
print(tuple1[-1])    # 3

# 元组不可变，不能修改
# tuple1[0] = 10  # 会报错

# 元组可以嵌套
tuple5 = (1, 2, (3, 4))
```

:::tip
列表和元组的区别：
- list：可变，用方括号 `[]`
- tuple：不可变，用圆括号 `()`
- tuple性能更好，适合作为字典的key
:::

### 1.4. 条件判断

#### if语句

```python
age = 18

if age >= 18:
    print('成年人')
elif age >= 13:
    print('青少年')
else:
    print('儿童')
```

#### 布尔运算

```python
# and, or, not
a = True
b = False

print(a and b)   # False
print(a or b)    # True
print(not a)     # False

# 比较运算符
x = 10
y = 20

print(x == y)    # False
print(x != y)    # True
print(x < y)     # True
print(x >= y)    # False
```

### 1.5. 模式匹配

Python 3.10+ 引入了 `match-case` 语句：

```python
def handle_status(status):
    match status:
        case 200:
            return '成功'
        case 404:
            return '未找到'
        case 500:
            return '服务器错误'
        case _:  # 默认情况
            return '未知状态'

# 模式匹配也可以用于解构
point = (0, 1)
match point:
    case (0, 0):
        print('原点')
    case (0, y):
        print(f'Y轴上，y={y}')
    case (x, 0):
        print(f'X轴上，x={x}')
    case (x, y):
        print(f'普通点 ({x}, {y})')
```

### 1.6. 循环

#### for循环

```python
# 遍历列表
fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)

# range函数
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 5):     # 1, 2, 3, 4
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8
    print(i)

# 遍历字典
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(key, value)
```

#### while循环

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

#### break和continue

```python
# break: 跳出循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue: 跳过当前迭代
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9
```

### 1.7. 使用dict和set

#### 字典（dict）

字典是键值对的无序集合：

```python
# 创建字典
d1 = {'name': 'Python', 'age': 30}
d2 = dict(name='Python', age=30)
d3 = {}  # 空字典

# 访问元素
print(d1['name'])           # 'Python'
print(d1.get('name'))       # 'Python'
print(d1.get('city', '未知')) # '未知'（默认值）

# 添加/修改元素
d1['city'] = 'Guangzhou'
d1['age'] = 31

# 删除元素
del d1['age']
d1.pop('name')              # 返回并删除

# 遍历字典
for key in d1:
    print(key, d1[key])

for key, value in d1.items():
    print(key, value)
```

#### 集合（set）

集合是无序、不重复的元素集合：

```python
# 创建集合
s1 = {1, 2, 3}
s2 = set([1, 2, 3, 3])  # {1, 2, 3} (去重)
s3 = set()  # 空集合（不能用{}，那是字典）

# 添加元素
s1.add(4)               # {1, 2, 3, 4}
s1.update([5, 6])       # {1, 2, 3, 4, 5, 6}

# 删除元素
s1.remove(4)            # 不存在会报错
s1.discard(7)           # 不存在不会报错
s1.pop()                # 随机删除一个

# 集合运算
a = {1, 2, 3}
b = {2, 3, 4}

print(a | b)            # {1, 2, 3, 4} (并集)
print(a & b)            # {2, 3} (交集)
print(a - b)            # {1} (差集)
print(a ^ b)            # {1, 4} (对称差集)
```

## 2. 函数

### 2.1. 调用函数

```python
# Python内置函数
print('Hello')          # 输出
len([1, 2, 3])          # 3
max(1, 2, 3)            # 3
min(1, 2, 3)            # 1
abs(-5)                 # 5
int('123')              # 123
str(123)                # '123'

# 函数可以有多个参数
print('Hello', 'World', sep='-')  # Hello-World
```

### 2.2. 定义函数

```python
# 基本函数定义
def greet():
    print('Hello!')

# 带参数的函数
def greet(name):
    print(f'Hello, {name}!')

# 带返回值的函数
def add(a, b):
    return a + b

result = add(3, 5)  # 8

# 多返回值
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(10, 3)  # q=3, r=1
```

### 2.3. 函数的参数

#### 位置参数

```python
def power(x, n):
    return x ** n

power(2, 3)  # 8
```

#### 默认参数

```python
def power(x, n=2):  # n默认为2
    return x ** n

power(3)     # 9 (3的2次方)
power(3, 3)  # 27 (3的3次方)
```

:::tip
默认参数必须指向不可变对象，避免使用可变对象作为默认值：
```python
# 错误示例
def add_item(item, items=[]):  # 危险！
    items.append(item)
    return items

# 正确示例
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```
:::

#### 可变参数

```python
# *args: 接收任意个位置参数
def calc_sum(*args):
    total = 0
    for num in args:
        total += num
    return total

calc_sum(1, 2, 3)      # 6
calc_sum(1, 2, 3, 4, 5)  # 15

# **kwargs: 接收任意个关键字参数
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f'{key}: {value}')

print_info(name='Python', age=30)
```

#### 参数组合

参数顺序：位置参数 -> 默认参数 -> 可变参数 -> 关键字参数

```python
def func(a, b, c=0, *args, **kwargs):
    print('a =', a)
    print('b =', b)
    print('c =', c)
    print('args =', args)
    print('kwargs =', kwargs)

func(1, 2, 3, 4, 5, x=6, y=7)
# a = 1
# b = 2
# c = 3
# args = (4, 5)
# kwargs = {'x': 6, 'y': 7}
```

### 2.4. 递归函数

递归函数是自己调用自己的函数：

```python
# 计算阶乘
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

factorial(5)  # 120

# 斐波那契数列
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

fib(6)  # 8
```

:::tip
递归需要注意：
- 必须有递归终止条件
- 递归深度有限制（Python默认1000）
- 避免无限递归
:::

## 3. 高级特性

### 3.1. 切片

切片可以方便地获取序列的一部分：

```python
L = list(range(10))  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

L[0:3]    # [0, 1, 2]
L[:3]     # [0, 1, 2] (同上面)
L[3:]     # [3, 4, 5, 6, 7, 8, 9]
L[:]      # [0, 1, 2, ..., 9] (复制整个列表)
L[::2]    # [0, 2, 4, 6, 8] (每2个取一个)
L[::-1]   # [9, 8, 7, ..., 0] (反转)

# 字符串也可以切片
'Python'[0:3]  # 'Pyt'
'Python'[::-1] # 'nohtyP'
```

### 3.2. 迭代

迭代是访问集合元素的一种方式：

```python
# 迭代列表
for item in [1, 2, 3]:
    print(item)

# 迭代字典
d = {'a': 1, 'b': 2}
for key in d:           # 迭代key
    print(key)

for value in d.values():  # 迭代value
    print(value)

# 迭代索引和值
for i, value in enumerate(['a', 'b', 'c']):
    print(i, value)
# 0 a
# 1 b
# 2 c

# 同时迭代多个序列
for x, y in zip([1, 2, 3], ['a', 'b', 'c']):
    print(x, y)
```

### 3.3. 列表生成式

列表生成式可以简洁地创建列表：

```python
# 基本语法
[x * x for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 带条件
[x * x for x in range(1, 11) if x % 2 == 0]
# [4, 16, 36, 64, 100]

# 多重循环
[m + n for m in 'ABC' for n in 'XYZ']
# ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']

# 字典生成式
d = {x: x * x for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 集合生成式
s = {x * x for x in range(5)}
# {0, 1, 4, 9, 16}
```

### 3.4. 生成器

生成器是一种特殊的迭代器，可以节省内存：

```python
# 创建生成器方法1: 列表生成式改为生成器表达式
g = (x * x for x in range(10))
print(next(g))  # 0
print(next(g))  # 1

# 使用for循环迭代
for value in g:
    print(value)

# 创建生成器方法2: 使用yield
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

f = fib()
print(next(f))  # 0
print(next(f))  # 1
print(next(f))  # 1
print(next(f))  # 2
```

### 3.5. 迭代器

迭代器是可以被`next()`函数调用并不断返回下一个值的对象：

```python
# 可迭代对象
from collections.abc import Iterable, Iterator

isinstance([1, 2, 3], Iterable)      # True
isinstance('abc', Iterable)          # True
isinstance(123, Iterable)            # False

# 迭代器
isinstance(iter([1, 2, 3]), Iterator)  # True
isinstance([1, 2, 3], Iterator)        # False

# 手动迭代
it = iter([1, 2, 3])
print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3
# print(next(it))  # StopIteration异常
```

:::tip
可迭代对象 vs 迭代器：
- **可迭代对象**：可以使用`for`循环遍历的对象
- **迭代器**：可以使用`next()`函数获取下一个值的对象
- 生成器是迭代器的一种，更简洁易用
:::

## 总结

Python基础知识要点：

- 数据类型：整数、浮点数、字符串、布尔值、None
- 数据结构：list（可变）、tuple（不可变）、dict（键值对）、set（不重复）
- 控制流：条件判断（if-elif-else）、循环（for、while）、模式匹配（match-case）
- 函数：定义、参数（位置、默认、可变）、递归
- 高级特性：切片、迭代、列表生成式、生成器、迭代器
