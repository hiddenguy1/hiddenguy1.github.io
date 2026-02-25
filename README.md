# Hexo 博客源码目录

这是 Hexo 博客的源码目录,包含所有的文章源文件、主题和配置。

## 目录结构

```
hexo-source/
├── source/              # 源文件目录
│   └── _posts/         # 博客文章 (Markdown 格式)
├── themes/             # 主题目录
│   └── yilia/          # Yilia 主题
├── _config.yml         # Hexo 主配置文件
├── package.json        # 依赖配置
├── scaffolds/          # 文章模板
└── public/             # 生成的静态文件 (发布到 GitHub Pages)
```

## 快速开始

### 1. 安装依赖

```bash
cd F:\hexo_blog\hexo-source
npm install
```

### 2. 创建新文章

```bash
hexo new "文章标题"
```

文章会创建在 `source/_posts/` 目录下。

### 3. 编辑文章

在文章的 Front-matter 中设置分类和标签:

```yaml
---
title: 文章标题
date: 2020-09-14
categories:
  - 技术教程     # 主分类
  - 博客搭建     # 子分类
tags:
  - Hexo
  - 教程
---
```

### 4. 本地预览

```bash
hexo server
# 访问 http://localhost:4000
```

### 5. 生成静态文件

```bash
hexo generate
# 生成到 public/ 目录
```

### 6. 部署到 GitHub Pages

```bash
hexo deploy
# 部署到 hiddenguy1.github.io
```

## 分类和标签系统

### 分类 (Categories)

分类是层级结构的,用于组织文章到不同的专栏:

- **技术教程**
  - 博客搭建
  - Linux
- **机器学习**
  - 算法系列
- **生活随笔**

### 标签 (Tags)

标签是平级的,用于标记关键词:

- Hexo
- 机器学习
- 算法
- Linux
- Ubuntu
- 教程

## 当前文章

1. Hello World (2020-09-09) - 生活随笔
2. 我的第一篇博客文章 (2020-09-10) - 生活随笔
3. Hexo 博客操作指南 (2020-09-14) - 技术教程/博客搭建
4. 机器学习算法1:线性回归 (2020-09-29) - 机器学习/算法系列
5. Ubuntu 操作基础 (2020-10-05) - 技术教程/Linux

## 发布目录

生成的静态文件位于 `F:\hexo_blog\hiddenguy1.github.io\`,该目录通过 Git 同步到 GitHub Pages。

## 相关配置

- **Hexo 配置**: [_config.yml](_config.yml)
- **主题配置**: [themes/yilia/_config.yml](themes/yilia/_config.yml)
- **文章模板**: [scaffolds/post.md](scaffolds/post.md)

## 更多信息

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Yilia 主题文档](https://github.com/litten/hexo-theme-yilia)
