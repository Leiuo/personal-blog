# 使用 GitHub Pages 部署你的静态网站

## github-pages 自动部署步骤

### 前置条件

1. 仓库 Settings → Pages → Source 选 **"Github Actions"**
2. 仓库 Settings → Actions → General → 选 **"Allow all actions"**
3. `public/` 目录下必须有 `.nojekyll` 文件

不添加 `.nojekyll` 会导致 GitHub 的 Jekyll 引擎忽略 `_` 开头的文件（如 Vite 生成的 `_plugin-vue_export-helper-*.js`），造成部署后页面白屏。

### 1. 创建 github 空仓库

```bash
# 在 GitHub 网站上
# 1. 点击 New repository
# 2. 仓库名称为：personal-blog（或你喜欢的名称）
# 3. 选择 Public
# 4. 不要初始化 README（因为我们要推送现有代码）
```

### 2. 本地项目准备工作

#### 2.1 修改 vite.config.js

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/personal-blog/', // 替换为你的仓库名，左右两边斜杠不能少
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
```

#### 2.2 修改路由模式（重要！）

因为 GitHub Pages 不支持 HTML5 History 模式（刷新会 404），需要改用 **Hash 模式**。

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'  // 改用 createWebHashHistory

//...

const router = createRouter({
    history: createWebHashHistory(),  // 改用 Hash 模式
    routes
})

export default router
```

#### 2.3 在项目根目录创建 .github/workflows/deploy.yml 文件

```bash
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```

#### 2.4 在 deploy.yml 中写入以下内容

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']  # 当 main 分支有 push 时触发
  workflow_dispatch:    # 允许手动触发

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. 将所有代码推入 github 远程仓库

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push origin main
```

### 4. 开启 Github Pages

- 进入 github 仓库 → Settings → Pages
- Source 选择 Github Actions

等待几分钟，GitHub Actions 会自动完成部署。可以在仓库的 Actions 标签页查看进度。