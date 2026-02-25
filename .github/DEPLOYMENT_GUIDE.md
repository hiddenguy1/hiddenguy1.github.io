# GitHub Actions 自动部署配置完成

## 配置文件位置
`/f/hexo_blog/hexo-source/.github/workflows/deploy.yml`

## 工作流功能

### 触发条件
- **自动触发**: 当代码推送到 `main` 分支时自动执行
- **手动触发**: 可在 GitHub Actions 页面手动运行工作流

### 工作流程
1. **构建阶段 (build)**
   - 使用 Ubuntu latest 环境
   - 安装 Node.js 20
   - 安装 Hexo CLI 和项目依赖
   - 执行 `hexo clean` 和 `hexo generate` 生成静态文件
   - 上传构建产物

2. **部署阶段 (deploy)**
   - 将静态文件部署到 GitHub Pages
   - 自动获取部署 URL

## 需要完成的设置步骤

### 1. 在 GitHub 仓库设置中启用 Pages

进入你的源代码仓库（应该是 `hexo-source` 或存放 Hexo 源码的仓库）：

1. 访问 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
   - 不要选择 `Deploy from a branch`

### 2. 确保 GitHub 仓库配置正确

**源代码仓库**（存放 Hexo 源码）:
- 应该包含 `_config.yml`、`source/`、`themes/` 等 Hexo 源文件
- 应该包含 `.github/workflows/deploy.yml` 文件
- 默认分支应为 `main`

**目标仓库**（hiddenguy1.github.io）:
- 这个仓库将自动接收部署的静态文件
- 不需要手动操作

### 3. 推送代码到 GitHub

如果还没有推送 `hexo-source` 的内容到 GitHub：

```bash
cd /f/hexo_blog/hexo-source
git init
git add .
git commit -m "Add Hexo blog source and GitHub Actions workflow"
git branch -M main
git remote add origin https://github.com/hiddenguy1/hexo-source.git  # 替换为你的源码仓库地址
git push -u origin main
```

### 4. 验证部署

1. 推送代码后，访问 GitHub 仓库的 **Actions** 标签
2. 查看工作流运行状态
3. 构建成功后，访问 `https://hiddenguy1.github.io` 查看博客

## 注意事项

### 权限要求
工作流需要以下权限（已在配置文件中设置）：
- `contents: read` - 读取仓库内容
- `pages: write` - 写入 Pages
- `id-token: write` - OIDC 认证

### 分支名称
- 如果你的默认分支不是 `main`，请修改 `deploy.yml` 第 6 行和第 22 行的分支名称

### 构建时间
- 首次构建可能需要 2-5 分钟
- 后续构建通常会更快（得益于 npm 缓存）

## 优势

1. **自动化**: 推送代码即可自动部署，无需手动执行命令
2. **保留历史**: 源代码和部署内容分开管理
3. **快速回滚**: GitHub Pages 支持快速回滚到之前的版本
4. **零成本**: 完全免费使用 GitHub 的服务器资源
5. **CI/CD**: 符合现代开发流程的最佳实践

## 故障排查

### 工作流失败
- 检查 **Actions** 标签下的日志
- 确保 `package.json` 中的依赖都正确
- 验证 Node.js 版本兼容性

### Pages 无法访问
- 确保 GitHub Pages 设置中 Source 已选择 `GitHub Actions`
- 检查 DNS 传播（首次部署可能需要几分钟）
- 验证仓库设置中的页面是否启用

### 构建成功但页面未更新
- 清除浏览器缓存
- 检查工作流是否真的成功（绿色对勾）
- 等待 1-2 分钟让 CDN 更新

## 配置文件说明

完整的配置文件位于：
```
/f/hexo_blog/hexo-source/.github/workflows/deploy.yml
```

主要配置项：
- **运行环境**: Ubuntu latest
- **Node.js 版本**: 20
- **缓存**: 启用 npm 缓存以加速构建
- **部署方式**: GitHub Pages 官方 Action
