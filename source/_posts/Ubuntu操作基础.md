---
title: Ubuntu 操作基础
date: 2020-10-05 19:50:49
tags:
  - Linux
  - Ubuntu
  - 操作系统
  - 教程
categories:
  - 技术教程
  - Linux
---

# Ubuntu 操作基础

Ubuntu 是一个流行的 Linux 发行版,本文介绍一些基础操作。

## 常用命令

### 文件和目录操作

```bash
# 查看当前目录
pwd

# 列出文件
ls
ls -la  # 显示所有文件(包括隐藏文件)

# 切换目录
cd /path/to/directory
cd ~    # 回到用户主目录
cd ..   # 返回上一级目录

# 创建目录
mkdir dirname

# 创建文件
touch filename

# 复制文件
cp source destination

# 移动/重命名文件
mv oldname newname

# 删除文件
rm filename
rm -r dirname  # 删除目录
```

### 文件查看

```bash
# 查看文件内容
cat filename

# 分页查看
more filename
less filename

# 查看文件头部
head filename
head -n 10 filename  # 查看前10行

# 查看文件尾部
tail filename
tail -n 10 filename  # 查看后10行
tail -f filename     # 实时查看文件更新
```

### 权限管理

```bash
# 修改权限
chmod 755 filename
chmod +x script.sh  # 添加执行权限

# 修改所有者
chown user:group filename
```

### 系统管理

```bash
# 查看系统信息
uname -a

# 查看磁盘使用
df -h

# 查看内存使用
free -h

# 查看进程
ps aux
top

# 安装软件
sudo apt update
sudo apt install package_name

# 服务管理
sudo systemctl start service
sudo systemctl stop service
sudo systemctl restart service
```

## 常用技巧

1. **Tab 键自动补全**: 输入命令或文件名的一部分后按 Tab 键
2. **命令历史**: 使用上下箭头键浏览历史命令
3. **清屏**: 使用 `clear` 命令或 Ctrl+L
4. **查看命令帮助**: `command --help` 或 `man command`

## 总结

掌握这些基础命令是使用 Ubuntu 的第一步,后续可以深入学习更多高级功能。
