import { marked } from 'marked'
import hljs from 'highlight.js'

// 代码高亮缓存，避免重复高亮相同代码块
const MAX_CACHE_SIZE = 200
const highlightCache = new Map()

function cachedHighlight(code, lang) {
    const cacheKey = lang ? `${lang}:${code}` : `auto:${code}`

    if (highlightCache.has(cacheKey)) {
        return highlightCache.get(cacheKey)
    }

    let result
    if (lang && hljs.getLanguage(lang)) {
        try {
            result = hljs.highlight(code, { language: lang }).value
        } catch (err) {
            console.error(err)
            result = hljs.highlightAuto(code).value
        }
    } else {
        result = hljs.highlightAuto(code).value
    }

    if (highlightCache.size >= MAX_CACHE_SIZE) {
        const firstKey = highlightCache.keys().next().value
        highlightCache.delete(firstKey)
    }
    highlightCache.set(cacheKey, result)
    return result
}

// 配置 marked
marked.setOptions({
    highlight: function (code, lang) {
        return cachedHighlight(code, lang)
    },
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
})

// 自定义渲染器
const renderer = new marked.Renderer()

renderer.link = ({ href, title, text }) => {
    const isExternal = href.startsWith('http')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${target}${titleAttr}>${text}</a>`
}

renderer.image = ({ href, title, text }) => {
    const titleAttr = title ? ` title="${title}"` : ''
    let url = href
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
        url = import.meta.env.BASE_URL + href.replace(/^\.\.\//g, '')
    }
    return `<img src="${url}" alt="${text}"${titleAttr} class="markdown-image" loading="lazy">`
}

marked.use({ renderer })

// 解析 Markdown 为 HTML
export const parseMarkdown = (markdown) => {
    if (!markdown) return ''
    try {
        let html = marked.parse(markdown)
        // 修正原始 <img> 标签的相对路径（绕过 renderer 的裸 img 标签）
        html = html.replace(/src="(\.\.\/[^"]+)"/g, (_, path) =>
            `src="${import.meta.env.BASE_URL + path.replace(/^\.\.\//g, '')}"`
        )
        return html
    } catch (error) {
        console.error('Markdown 解析错误:', error)
        return '<p>文章解析错误</p>'
    }
}

// 从 Markdown 内容中提取纯文本（用于摘要）
export const extractTextFromMarkdown = (markdown, length = 150) => {
    if (!markdown) return ''
    const text = markdown
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/`(.*?)`/g, '$1')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/>\s+(.*?)\n/g, '$1\n')
        .replace(/[-*+]\s+(.*?)\n/g, '$1\n')
        .replace(/\n\s*\n/g, ' ')

    return text.length > length ? text.substring(0, length) + '...' : text
}

// 获取阅读时间
export const getReadingTime = (markdown) => {
    if (!markdown) return 1
    const text = markdown.replace(/```[\s\S]*?```/g, '').replace(/<[^>]*>/g, '')
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return Math.max(1, minutes)
}