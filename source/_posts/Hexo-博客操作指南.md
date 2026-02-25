---
title: Hexo 博客操作指南
date: 2020-09-14 19:00:00
tags:
  - Hexo
  - 博客搭建
  - 教程
categories:
  - 技术教程
  - 博客搭建
---

# Hexo 博客操作指南

这是一篇关于如何使用 Hexo 搭建和管理博客的教程文章。

## 常用命令

### 创建新文章
```bash
hexo new "文章标题"
```

### 生成静态文件
```bash
hexo generate
# 或者
hexo g
```

### 启动本地服务器
```bash
hexo server
# 或者
hexo s
```

### 部署到 GitHub Pages
```bash
hexo deploy
# 或者
hexo d
```

### 组合命令
```bash
# 生成并部署
hexo generate --deploy
# 或者
hexo g -d
```

## 文章分类和标签

在文章的 Front-matter 中设置分类和标签:

```yaml
---
title: 文章标题
date: 2020-09-14
categories:
  - 技术教程
  - 博客搭建
tags:
  - Hexo
  - 教程
---
```

**注意**:
- `categories` 是层级结构的,可以有多个分类
- `tags` 是平级的,用于标记关键词
