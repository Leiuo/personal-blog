import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { parseMarkdown, extractTextFromMarkdown, getReadingTime } from '@/utils/markdown'

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

            posts.value = postsList.map(post => ({
                ...post,
                readingTime: null
            }))
        } catch (error) {
            console.error('获取文章失败:', error)
            posts.value = []
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

            // 获取 Markdown 文件
            const response = await fetch(`${BASE_PATH}posts/${postMeta.filename || id + '.md'}`)
            if (!response.ok) throw new Error('Failed to fetch post content')
            const markdown = await response.text()

            // 移除 frontmatter（如果存在）
            let content = markdown
            if (markdown.startsWith('---')) {
                const endOfFrontmatter = markdown.indexOf('---', 3)
                if (endOfFrontmatter !== -1) {
                    content = markdown.substring(endOfFrontmatter + 3)
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

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value
        localStorage.setItem('blog-theme', isDarkMode.value ? 'dark' : 'light')
        updateTheme()
    }

    const updateTheme = () => {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
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
        toggleDarkMode,
        initTheme
    }
})