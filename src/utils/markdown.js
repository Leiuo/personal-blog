import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// 配置 marked
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value
            } catch (err) {
                console.error(err)
            }
        }
        return hljs.highlightAuto(code).value
    },
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
})

// 自定义渲染器
const renderer = new marked.Renderer()

renderer.link = (href, title, text) => {
    const isExternal = href.startsWith('http')
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${target}${titleAttr}>${text}</a>`
}

renderer.image = (href, title, text) => {
    const titleAttr = title ? ` title="${title}"` : ''
    return `<img src="${href}" alt="${text}"${titleAttr} class="markdown-image" loading="lazy">`
}

marked.use({ renderer })

// 解析 Markdown 为 HTML
export const parseMarkdown = (markdown) => {
    if (!markdown) return ''
    try {
        return marked.parse(markdown)
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