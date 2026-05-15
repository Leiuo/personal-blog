# Personal Blog

一个基于 Vue 3 的现代化个人博客系统。

## ✨ 功能特性

- 📝 **Markdown 文章支持** - 支持 Markdown 格式编写文章
- 🔍 **文章搜索** - 支持按标题、摘要、标签搜索文章
- 📁 **分类管理** - 文章分类展示
- 📅 **归档页面** - 按时间归档文章
- 📱 **响应式设计** - 支持桌面和移动设备
- 🌙 **深色模式** - 支持明暗主题切换，自动检测系统偏好
- 📖 **阅读体验** - 阅读进度条、回到顶部按钮
- ⚡ **快速加载** - 使用 Vite 构建，加载速度快

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 6
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **样式**: SCSS + CSS 变量（支持深色模式）
- **Markdown**: marked
- **图标**: SVG Icons

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3001/personal-blog/ 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
personal-blog/
├── .github/                 # GitHub 配置
│   └── workflows/           # CI/CD 工作流
├── .vscode/                 # VS Code 配置
├── public/                  # 静态资源
│   ├── images/              # 图片资源
│   ├── posts/               # Markdown 文章
│   │   ├── posts.json       # 文章元数据
│   │   └── *.md             # 文章内容
│   ├── favicon.svg          # 网站图标
│   └── icons.svg            # 图标资源
├── src/                     # 源代码
│   ├── assets/              # 资源文件
│   │   ├── styles/          # 样式文件
│   │   └── images/          # 图片资源
│   ├── components/          # Vue 组件
│   │   ├── BlogCard.vue     # 文章卡片组件
│   │   ├── Header.vue       # 头部导航组件
│   │   ├── Footer.vue       # 底部组件
│   │   ├── ScrollTop.vue    # 阅读进度条和回到顶部
│   │   └── MarkdownEditor.vue # Markdown 编辑器
│   ├── router/              # 路由配置
│   │   └── index.js         # 路由定义
│   ├── stores/              # Pinia 状态管理
│   │   └── blog.js          # 博客数据状态（含主题管理）
│   ├── utils/               # 工具函数
│   │   ├── markdown.js      # Markdown 解析工具
│   │   └── postLoader.js    # 文章加载工具
│   ├── views/               # 页面视图
│   │   ├── Home.vue         # 首页
│   │   ├── BlogDetail.vue   # 文章详情页
│   │   ├── Category.vue     # 分类页面
│   │   ├── Archives.vue     # 归档页面
│   │   ├── Search.vue        # 搜索页面
│   │   └── About.vue        # 关于页面
│   ├── App.vue              # 根组件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── vite.config.js           # Vite 配置
└── README.md                # 项目说明
```

## 📖 使用说明

### 添加新文章

1. 在 `public/posts/` 目录下创建新的 Markdown 文件
2. 在 `public/posts/posts.json` 中添加文章元数据：

```json
{
  "id": "article-id",
  "title": "文章标题",
  "category": "分类",
  "date": "2024-01-01",
  "tags": ["标签1", "标签2"],
  "excerpt": "文章摘要",
  "cover": "封面图片URL",
  "filename": "article-id.md"
}
```

### Markdown 文章格式

文章支持标准 Markdown 语法，同时支持 Frontmatter：

```markdown
---
title: 文章标题
date: 2024-01-01
category: 技术
tags: [Vue, JavaScript]
cover: https://example.com/cover.jpg
---

文章内容...
```

### 深色模式

- 主题状态自动保存到浏览器 `localStorage`
- 支持手动切换（点击导航栏中的 ☀️/🌙 图标）
- 自动检测系统深色模式偏好

## 🌐 路由结构

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | Home | 首页，展示最新文章 |
| `/blog/:id` | BlogDetail | 文章详情页 |
| `/category/:name` | Category | 分类文章列表 |
| `/archives` | Archives | 文章归档 |
| `/search` | Search | 搜索页面 |
| `/about` | About | 关于页面 |

## 🎨 主题定制

项目使用 CSS 变量进行主题管理，主要变量定义在 `src/assets/styles/main.css`：

```css
:root {
    --bg-primary: #f8f9fa;
    --bg-secondary: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --accent-color: #4CAF50;
    --border-color: #e0e0e0;
}

.dark {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --accent-color: #4CAF50;
    --border-color: #333333;
}
```

## 🚢 部署

项目已配置 GitHub Actions 自动部署。推送代码到 `main` 分支后，会自动构建并部署到 GitHub Pages。

### 手动部署

```bash
npm run build
# 将 dist 目录部署到静态站点托管服务
```