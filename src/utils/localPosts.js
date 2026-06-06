const STORAGE_KEY = 'blog-local-posts'

// 读取所有本地文章元数据（不含正文，用于列表展示）
export function loadLocalPosts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []
        return JSON.parse(raw)
    } catch {
        return []
    }
}

// 保存一篇新文章
export function saveLocalPost(post) {
    const posts = loadLocalPosts()
    // 如果已有相同 id 的文章则替换
    const idx = posts.findIndex(p => p.id === post.id)
    if (idx !== -1) {
        posts[idx] = post
    } else {
        posts.unshift(post)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

// 根据 id 获取单篇文章（含正文）
export function getLocalPostById(id) {
    const posts = loadLocalPosts()
    return posts.find(p => p.id === id) || null
}

// 删除一篇本地文章
export function deleteLocalPost(id) {
    const posts = loadLocalPosts()
    const filtered = posts.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
