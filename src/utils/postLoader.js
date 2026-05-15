// 动态导入所有 Markdown 文件
const modules = import.meta.glob('/posts/*.md', {
    as: 'raw',
    eager: false
})

import matter from 'gray-matter'

// 加载所有文章
export const loadAllPosts = async () => {
    const posts = []

    for (const path in modules) {
        try {
            const content = await modules[path]()
            const { data: frontmatter, content: markdown } = matter(content)

            // 提取文件名作为 ID
            const id = path.split('/').pop().replace('.md', '')

            posts.push({
                id,
                ...frontmatter,
                markdown,
                path
            })
        } catch (error) {
            console.error(`加载文章失败 ${path}:`, error)
        }
    }

    // 按日期排序
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 根据 ID 加载单篇文章
export const loadPostById = async (id) => {
    // 查找匹配的文章
    for (const path in modules) {
        if (path.includes(id)) {
            try {
                const content = await modules[path]()
                const { data: frontmatter, content: markdown } = matter(content)

                return {
                    id,
                    ...frontmatter,
                    markdown
                }
            } catch (error) {
                console.error(`加载文章失败 ${path}:`, error)
                return null
            }
        }
    }
    return null
}

// 按分类获取文章
export const getPostsByCategory = async (category) => {
    const posts = await loadAllPosts()
    return posts.filter(post => post.category === category)
}

// 获取所有分类
export const getAllCategories = async () => {
    const posts = await loadAllPosts()
    const categories = new Set()
    posts.forEach(post => {
        if (post.category) categories.add(post.category)
    })
    return Array.from(categories)
}