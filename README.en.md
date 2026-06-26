# Personal Blog

[![中文](https://img.shields.io/badge/lang-中文-red.svg)](README.md) [![English](https://img.shields.io/badge/lang-English-blue.svg)](README.en.md)

A modern personal blog system built with Vue 3.

## Features

- **Markdown Articles** — Write in Markdown format with syntax-highlighted code blocks
- **Article Writing** — Built-in Markdown editor with hotkeys and live preview
- **Article Search** — Full-text search by title, excerpt, and tags
- **Category Management** — Filter articles by category
- **Archives Page** — Year-based archive display
- **Responsive Design** — Desktop + Mobile adaptive layout
- **Dark Mode** — Light/dark theme toggle, auto-follows system preference
- **Reading Experience** — Reading progress bar + Back-to-top button + Table of Contents + Prev/Next navigation
- **Auto Deploy** — Push-to-deploy via GitHub Actions to GitHub Pages

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite + Rolldown
- **Routing**: Vue Router 4 (Hash Mode)
- **State Management**: Pinia
- **Styling**: SCSS + CSS Variables (Dark Mode)
- **Markdown**: marked + highlight.js + gray-matter
- **Icons**: Inline SVG (Lucide-style)

## Quick Start

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3001 to view it in the browser.

### Production Build

```bash
npm run build
```

Build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
personal-blog/
├── .github/workflows/       # GitHub Actions auto-deploy
├── public/                  # Static assets
│   ├── images/              # Article covers & avatar
│   ├── posts/               # Markdown articles
│   │   ├── posts.json       # Article metadata
│   │   └── *.md             # Article content
│   ├── favicon.svg
│   ├── icons.svg
│   └── .nojekyll            # Disable GitHub Pages Jekyll processing
├── src/
│   ├── assets/styles/       # Global styles & CSS variable themes
│   ├── components/          # Shared components
│   │   ├── BlogCard.vue     # Article card
│   │   ├── Header.vue       # Navbar + Search + Theme toggle
│   │   ├── Footer.vue       # Footer
│   │   ├── ScrollTop.vue    # Reading progress + Back to top
│   │   └── MarkdownEditor.vue # Markdown editor
│   ├── router/index.js      # Route configuration
│   ├── stores/blog.js       # Pinia store (articles + theme)
│   ├── utils/markdown.js    # Markdown parser
│   ├── views/               # Pages
│   │   ├── Home.vue         # Homepage
│   │   ├── BlogDetail.vue   # Article detail
│   │   ├── Category.vue     # Category list
│   │   ├── Archives.vue     # Article archives
│   │   ├── Search.vue       # Search
│   │   ├── Write.vue        # Write article
│   │   ├── About.vue        # About
│   │   └── NotFound.vue     # 404
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## Usage

### Adding a New Article

1. Create a new Markdown file in the `public/posts/` directory
2. Add the article metadata to `public/posts/posts.json`:

```json
{
  "id": "article-id",
  "title": "Article Title",
  "category": "Category",
  "date": "2026-05-01",
  "tags": ["Tag1", "Tag2"],
  "excerpt": "Article excerpt",
  "cover": "images/cover.jpg",
  "filename": "article-id.md"
}
```

### Markdown Article Format

Articles use standard Markdown syntax. Metadata is managed in `posts.json`; the article file only needs the body content.

```markdown
## Section Title

Article body content, supports `code`, **bold**, *italic*, and other standard syntax.

​```js
// Code blocks with automatic syntax highlighting
console.log('hello')
​```
```

> Tip: Place article cover images in `public/images/` and reference them with relative paths in `posts.json`, e.g. `"cover": "images/my-cover.jpg"`.

## Route Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Homepage, displays latest articles |
| `/blog/:id` | BlogDetail | Article detail page |
| `/category/:name` | Category | Category article list |
| `/archives` | Archives | Article archives |
| `/write` | Write | Write new article |
| `/search` | Search | Search page |
| `/about` | About | About page |
| `/:pathMatch(.*)*` | NotFound | 404 page |

## Theme Customization

The project uses CSS variables for theme management, defined in `src/assets/styles/main.css`. Change the `--accent-color` to swap the primary color:

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

- Theme preference is automatically saved to `localStorage`
- Toggle manually via the button on the right side of the navbar
- First visit follows the system `prefers-color-scheme` automatically

## Deployment

Pushing to the `main` branch automatically triggers GitHub Actions to build and deploy to GitHub Pages.

### Prerequisites

1. Repository Settings → Pages → Source → select **"GitHub Actions"**
2. Repository Settings → Actions → General → select **"Allow all actions"**
3. The `.nojekyll` file must exist in the `public/` directory (already included)

Without `.nojekyll`, GitHub's Jekyll engine will ignore files starting with `_` (such as Vite-generated `_plugin-vue_export-helper-*.js`), causing a blank page after deployment.

### Manual Deployment

```bash
npm run build
# Upload dist/ to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.)
```

The `base` in Vite configuration must match the deployment path. Currently set to `/personal-blog/`; modify `vite.config.js` as needed when deploying to other services.
