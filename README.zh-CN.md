# Personal Blog

[![中文](https://img.shields.io/badge/lang-中文-red.svg)](README.zh-CN.md) [![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)

一个基于 Vue 3 的现代化个人博客系统。

## 功能特性

- **Markdown 文章** — 支持 Markdown 格式编写，代码语法高亮
- **文章写作** — 内置 Markdown 编辑器，支持快捷键和实时预览
- **文章搜索** — 按标题、摘要、标签全文搜索
- **分类管理** — 按分类筛选文章
- **归档页面** — 按年份归档展示
- **响应式设计** — 桌面端 + 移动端适配
- **深色模式** — 明暗主题切换，自动跟随系统偏好
- **阅读体验** — 阅读进度条 + 回到顶部按钮 + 文章目录 + 上下篇导航
- **自动部署** — GitHub Actions 推送即部署到 GitHub Pages

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite + Rolldown
- **路由**: Vue Router 4 (Hash 模式)
- **状态管理**: Pinia
- **样式**: SCSS + CSS 变量（深色模式）
- **Markdown**: marked + highlight.js + gray-matter
- **图标**: 内联 SVG（Lucide 风格）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3001 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
personal-blog/
├── .github/workflows/       # GitHub Actions 自动部署
├── public/                  # 静态资源
│   ├── images/              # 文章封面 & 头像
│   ├── posts/               # Markdown 文章
│   │   ├── posts.json       # 文章元数据
│   │   └── *.md             # 文章内容
│   ├── favicon.svg
│   ├── icons.svg
│   └── .nojekyll            # 禁用 GitHub Pages Jekyll 处理
├── src/
│   ├── assets/styles/       # 全局样式 & CSS 变量主题
│   ├── components/          # 通用组件
│   │   ├── BlogCard.vue     # 文章卡片
│   │   ├── Header.vue       # 导航栏 + 搜索 + 主题切换
│   │   ├── Footer.vue       # 页脚
│   │   ├── ScrollTop.vue    # 阅读进度条 + 回到顶部
│   │   └── MarkdownEditor.vue # Markdown 编辑器
│   ├── router/index.js      # 路由配置
│   ├── stores/blog.js       # Pinia 状态（文章 + 主题）
│   ├── utils/markdown.js    # Markdown 解析
│   ├── views/               # 页面
│   │   ├── Home.vue         # 首页
│   │   ├── BlogDetail.vue   # 文章详情
│   │   ├── Category.vue     # 分类列表
│   │   ├── Archives.vue     # 文章归档
│   │   ├── Search.vue       # 搜索
│   │   ├── Write.vue        # 写作页面
│   │   ├── About.vue        # 关于
│   │   └── NotFound.vue     # 404
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## 使用说明

### 添加新文章

1. 在 `public/posts/` 目录下创建新的 Markdown 文件
2. 在 `public/posts/posts.json` 中添加文章元数据：

```json
{
  "id": "article-id",
  "title": "文章标题",
  "category": "分类",
  "date": "2026-05-01",
  "tags": ["标签1", "标签2"],
  "excerpt": "文章摘要",
  "cover": "images/cover.jpg",
  "filename": "article-id.md"
}
```

### Markdown 文章格式

文章使用标准 Markdown 语法，元数据在 `posts.json` 中管理，文章文件只写正文即可。

```markdown
## 章节标题

文章正文内容，支持 `代码`、**加粗**、*斜体* 等标准语法。

​```js
// 代码块自动语法高亮
console.log('hello')
​```
```

> 提示：文章封面图放到 `public/images/`，在 `posts.json` 中用相对路径引用，如 `"cover": "images/my-cover.jpg"`。

## 路由结构

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | Home | 首页，展示最新文章 |
| `/blog/:id` | BlogDetail | 文章详情页 |
| `/category/:name` | Category | 分类文章列表 |
| `/archives` | Archives | 文章归档 |
| `/write` | Write | 写作页面 |
| `/search` | Search | 搜索页面 |
| `/about` | About | 关于页面 |
| `/:pathMatch(.*)*` | NotFound | 404 页面 |

## 主题定制

项目使用 CSS 变量管理主题，定义在 `src/assets/styles/main.css`。修改 `--accent-color` 即可换主色：

```css
:root {
    --bg-primary: #f8f9fa;
    --bg-secondary: #ffffff;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-muted: #999999;
    --accent-color: #10B981;
    --accent-hover: #059669;
    --border-color: #e0e0e0;
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark {
    --bg-primary: #1a1a2e;
    --bg-secondary: #16213e;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --text-muted: #808080;
    --accent-color: #34D399;
    --accent-hover: #10B981;
    --border-color: #333333;
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

- 主题偏好自动保存到 `localStorage`
- 手动切换点击导航栏右侧按钮
- 首次访问自动跟随系统 `prefers-color-scheme`

## 部署

推送 `main` 分支自动触发 GitHub Actions 构建并部署到 GitHub Pages。

### 前置条件

1. 仓库 Settings → Pages → Source 选 **"GitHub Actions"**
2. 仓库 Settings → Actions → General → 选 **"Allow all actions"**
3. `public/` 目录下必须有 `.nojekyll` 文件（已包含）

不添加 `.nojekyll` 会导致 GitHub 的 Jekyll 引擎忽略 `_` 开头的文件（如 Vite 生成的 `_plugin-vue_export-helper-*.js`），造成部署后页面白屏。

### 手动部署

```bash
npm run build
# 将 dist/ 上传到任意静态托管服务（Vercel、Netlify、Cloudflare Pages 等）
```

Vite 配置中 `base` 需与部署路径一致。当前为 `/personal-blog/`，部署到其他服务时按需修改 `vite.config.js`。