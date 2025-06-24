---
title: ClashX 本地开发域名访问返回 404
date: 2025-06-24
tags: ['clashX']
description: ClashX 本地开发域名访问返回 404
category: 'note'
---

# ClashX 本地开发域名访问返回 404

## 问题现象

本地 xxx.xxx.cn 映射到 192.168.xxx.xxx，使用 /etc/hosts 配置了对应域名。但开启 ClashX 后访问页面返回 404，关闭 ClashX 一切正常。

## 排查思路
- 确认 /etc/hosts 配置正确 ✅
- 确认 ClashX 的规则设置了 DIRECT ✅
- 怀疑 ClashX 的 DNS 拦截了系统 hosts 解析路径 ✅

## 解决方案

修改 ClashX 配置，增加或调整以下内容：

```yaml
dns:
  enable: true
  use-hosts: true

hosts:
  xxx.xxx.cn: 192.168.xxx.xxx
```

- dns.use-hosts: true：明确告诉 ClashX 使用本地 hosts 文件
- hosts：显式补充域名映射，避免 DNS 解析出错。
