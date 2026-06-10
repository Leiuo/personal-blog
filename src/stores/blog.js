import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { parseMarkdown, extractTextFromMarkdown, getReadingTime } from '@/utils/markdown'
import { loadLocalPosts, getLocalPostById } from '@/utils/localPosts'

const BASE_PATH = import.meta.env.BASE_URL || '/personal-blog/'

export const useBlogStore = defineStore('blog', () => {
    const posts = ref([])
    const currentPost = ref(null)
    const loading = ref(false)

    // 获取所有文章
    const fetchPosts = async () => {
        loading.value = true
        try {
            const response = await fetch(`${BASE_PATH}posts/posts.json`)
            if (!response.ok) throw new Error('Failed to fetch posts')
            const postsList = await response.json()

            const remotePosts = postsList.map(post => ({
                ...post,
                readingTime: null
            }))

            // 合并本地文章（排在前面）
            const localPosts = loadLocalPosts().map(p => ({
                ...p,
                readingTime: null,
                isLocal: true
            }))
            posts.value = [...localPosts, ...remotePosts]
        } catch (error) {
            console.error('获取文章失败:', error)
            // 即使远程加载失败，也展示本地文章
            posts.value = loadLocalPosts().map(p => ({
                ...p,
                readingTime: null,
                isLocal: true
            }))
        } finally {
            loading.value = false
        }
    }

    // 获取单篇文章
    const fetchPostById = async (id) => {
        loading.value = true
        try {
            // 如果文章列表为空，先获取文章列表
            if (posts.value.length === 0) {
                await fetchPosts()
            }
            
            // 查找文章元数据
            const postMeta = posts.value.find(p => p.id === id)
            if (!postMeta) throw new Error('Post not found')

            let content
            let markdown = ''

            // 本地文章直接从 localStorage 读取内容
            if (postMeta.isLocal) {
                const localPost = getLocalPostById(id)
                if (localPost) {
                    content = localPost.content || ''
                    markdown = content
                } else {
                    throw new Error('Local post content not found')
                }
            } else {
                // 获取 Markdown 文件
                const response = await fetch(`${BASE_PATH}posts/${postMeta.filename || id + '.md'}`)
                if (!response.ok) throw new Error('Failed to fetch post content')
                markdown = await response.text()

                // 移除 frontmatter（如果存在）
                content = markdown
                if (markdown.startsWith('---')) {
                    const endOfFrontmatter = markdown.indexOf('---', 3)
                    if (endOfFrontmatter !== -1) {
                        content = markdown.substring(endOfFrontmatter + 3)
                    }
                }
            }

            // 解析 Markdown
            const contentHtml = parseMarkdown(content)

            currentPost.value = {
                ...postMeta,
                markdown: content,
                contentHtml,
                readingTime: getReadingTime(content),
                excerpt: postMeta.excerpt || extractTextFromMarkdown(content, 150)
            }

            return currentPost.value
        } catch (error) {
            console.error('获取文章详情失败:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    // 按分类获取文章
    const getPostsByCategory = (category) => {
        return posts.value.filter(post => post.category === category)
    }

    // 获取所有分类
    const getAllCategories = computed(() => {
        const categories = new Set()
        posts.value.forEach(post => {
            if (post.category) categories.add(post.category)
        })
        return Array.from(categories)
    })

    // 获取相邻文章（上一篇/下一篇），按日期排序
    const getAdjacentPosts = (id) => {
        const sorted = [...posts.value].sort((a, b) => new Date(b.date) - new Date(a.date))
        const idx = sorted.findIndex(p => p.id === id)
        if (idx === -1) return { prev: null, next: null }
        return {
            prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
            next: idx > 0 ? sorted[idx - 1] : null
        }
    }

    // 获取相关文章，基于标签交集数量排序
    const getRelatedPosts = (id, limit = 3) => {
        const current = posts.value.find(p => p.id === id)
        if (!current || !current.tags || !current.tags.length) return []
        return posts.value
            .filter(p => p.id !== id)
            .map(p => ({
                ...p,
                _shared: p.tags ? p.tags.filter(t => current.tags.includes(t)).length : 0
            }))
            .filter(p => p._shared > 0)
            .sort((a, b) => b._shared - a._shared)
            .slice(0, limit)
    }

    // 搜索文章
    const searchPosts = (keyword) => {
        if (!keyword) return posts.value
        const searchTerm = keyword.toLowerCase()
        return posts.value.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm)) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        )
    }

    // 主题模式
    const isDarkMode = ref(false)
    let darkThemeStyle = null

    // 动态加载 highlight.js 暗色主题 CSS
    async function loadDarkHighlightTheme() {
        if (darkThemeStyle) return
        try {
            const mod = await import('highlight.js/styles/github-dark.css?inline')
            darkThemeStyle = document.createElement('style')
            darkThemeStyle.id = 'hljs-dark-theme'
            darkThemeStyle.textContent = mod.default
            document.head.appendChild(darkThemeStyle)
        } catch (e) {
            console.error('加载暗色代码高亮主题失败:', e)
        }
    }

    // 移除 highlight.js 暗色主题 CSS
    function removeDarkHighlightTheme() {
        if (darkThemeStyle) {
            darkThemeStyle.remove()
            darkThemeStyle = null
        }
    }

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value
        localStorage.setItem('blog-theme', isDarkMode.value ? 'dark' : 'light')
        updateTheme()
    }

    const updateTheme = () => {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark')
            loadDarkHighlightTheme()
        } else {
            document.documentElement.classList.remove('dark')
            removeDarkHighlightTheme()
        }
    }

    const initTheme = () => {
        const saved = localStorage.getItem('blog-theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDarkMode.value = saved === 'dark' || (saved === null && prefersDark)
        updateTheme()
    }

    return {
        posts,
        currentPost,
        loading,
        isDarkMode,
        fetchPosts,
        fetchPostById,
        getPostsByCategory,
        getAllCategories,
        searchPosts,
        getAdjacentPosts,
        getRelatedPosts,
        toggleDarkMode,
        initTheme
    }
})