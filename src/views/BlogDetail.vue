<template>
    <div class="blog-detail">
        <!-- 加载状态 -->
        <div v-if="loading" class="state-box">
            <svg class="spinner" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--accent-color)" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="var(--border-color)" stroke-width="2"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
            </svg>
            <p>加载中...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="state-box">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--accent-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>
            </svg>
            <p class="error-msg">{{ error }}</p>
            <button class="retry-btn" @click="loadPost">重新加载</button>
        </div>

        <!-- 文章内容 -->
        <div v-else-if="post" class="article-wrapper">
            <!-- 侧边 TOC 导航 -->
            <aside v-if="tocItems.length > 0" class="toc-sidebar">
                <div class="toc-title">目录</div>
                <nav class="toc-nav">
                    <a
                        v-for="item in tocItems"
                        :key="item.id"
                        :href="`#${item.id}`"
                        :class="['toc-link', { active: activeId === item.id }]"
                        :style="{ paddingLeft: (item.level - 1) * 12 + 16 + 'px' }"
                        @click.prevent="scrollToHeading(item.id)"
                    >{{ item.text }}</a>
                </nav>
            </aside>

            <article class="post-content">
                <header class="post-header">
                    <h1>{{ post.title }}</h1>
                    <div class="post-meta">
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                            {{ formatDate(post.date) }}
                        </span>
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                            {{ post.category }}
                        </span>
                        <span class="meta-item">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            {{ post.readingTime }} 分钟阅读
                        </span>
                    </div>
                </header>

                <div ref="postBody" class="post-body markdown-body" v-html="post.contentHtml"></div>

                <footer class="post-footer">
                    <div class="tags">
                        <span v-for="tag in post.tags" :key="tag" class="tag" @click="goToTag(tag)">
                            #{{ tag }}
                        </span>
                    </div>
                </footer>

                <!-- 上一篇 / 下一篇导航 -->
                <nav class="post-nav" v-if="prevPost || nextPost">
                    <router-link v-if="prevPost" :to="`/blog/${prevPost.id}`" class="nav-link nav-prev">
                        <span class="nav-label">← 上一篇</span>
                        <span class="nav-title">{{ prevPost.title }}</span>
                    </router-link>
                    <div class="nav-spacer"></div>
                    <router-link v-if="nextPost" :to="`/blog/${nextPost.id}`" class="nav-link nav-next">
                        <span class="nav-label">下一篇 →</span>
                        <span class="nav-title">{{ nextPost.title }}</span>
                    </router-link>
                </nav>

                <!-- 相关推荐 -->
                <section v-if="relatedPosts.length" class="related-posts">
                    <h3 class="related-title">相关推荐</h3>
                    <div class="related-grid">
                        <BlogCard v-for="p in relatedPosts" :key="p.id" :post="p" />
                    </div>
                </section>
            </article>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/BlogCard.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const post = ref(null)
const loading = ref(true)
const error = ref('')
const postBody = ref(null)

// TOC
const tocItems = ref([])
const activeId = ref('')
let observer = null

// Prev/Next & Related
const adjacentPosts = computed(() => post.value ? blogStore.getAdjacentPosts(post.value.id) : { prev: null, next: null })
const prevPost = computed(() => adjacentPosts.value.prev)
const nextPost = computed(() => adjacentPosts.value.next)
const relatedPosts = computed(() => post.value ? blogStore.getRelatedPosts(post.value.id, 3) : [])

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const goToTag = (tag) => {
    router.push(`/search?q=${encodeURIComponent(tag)}`)
}

const scrollToHeading = (id) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const extractToc = () => {
    if (!postBody.value) return
    const headings = postBody.value.querySelectorAll('h1, h2, h3')
    tocItems.value = Array.from(headings).map(h => ({
        id: h.id,
        text: h.textContent,
        level: parseInt(h.tagName.charAt(1))
    }))
}

const setupObserver = () => {
    if (!postBody.value) return
    const headings = postBody.value.querySelectorAll('h1, h2, h3')
    if (headings.length === 0) return

    observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    activeId.value = entry.target.id
                    break
                }
            }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(h => observer.observe(h))
}

const loadPost = async () => {
    loading.value = true
    error.value = ''
    try {
        const id = route.params.id
        post.value = await blogStore.fetchPostById(id)
    } catch (e) {
        error.value = e.message || '文章加载失败，请稍后重试'
    } finally {
        loading.value = false
    }
    // 等待 loading 切换后文章 DOM 渲染完成，再提取标题
    if (post.value && !error.value) {
        await nextTick()
        extractToc()
        setupObserver()
    }
}

// 路由切换时重新加载
watch(() => route.params.id, () => {
    if (route.name === 'BlogDetail') {
        if (observer) observer.disconnect()
        loadPost()
    }
})

onMounted(() => {
    loadPost()
})

onUnmounted(() => {
    if (observer) observer.disconnect()
})
</script>

<style lang="scss" scoped>
.blog-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;

    .state-box {
        text-align: center;
        padding: 80px 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        box-shadow: var(--shadow-light);

        p {
            color: var(--text-secondary);
            margin: 16px 0;
        }

        .error-msg {
            color: var(--accent-color);
        }

        .retry-btn {
            margin-top: 12px;
            padding: 10px 24px;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background: var(--accent-hover);
            }
        }
    }

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .article-wrapper {
        display: flex;
        gap: 40px;
        align-items: flex-start;
    }
}

// 侧边 TOC
.toc-sidebar {
    position: sticky;
    top: 100px;
    width: 220px;
    flex-shrink: 0;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 20px;
    box-shadow: var(--shadow-light);
    font-size: 13px;

    .toc-title {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color);
    }

    .toc-nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .toc-link {
        display: block;
        padding: 6px 8px;
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: 6px;
        border-left: 2px solid transparent;
        transition: all 0.2s;
        line-height: 1.4;
        word-break: break-all;

        &:hover {
            color: var(--accent-color);
            background: var(--accent-soft);
        }

        &.active {
            color: var(--accent-color);
            background: var(--accent-soft);
            border-left-color: var(--accent-color);
            font-weight: 500;
        }
    }
}

.post-content {
    flex: 1;
    min-width: 0;
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 40px;
    box-shadow: var(--shadow-light);

    .post-header {
        margin-bottom: 40px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;

        h1 {
            font-size: 32px;
            margin: 0 0 20px 0;
            color: var(--accent-color);
        }

        .post-meta {
            color: var(--text-secondary);
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;

            .meta-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        }
    }

    .post-footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);

        .tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            .tag {
                background: var(--bg-primary);
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;

                &:hover {
                    background: var(--accent-color);
                    color: white;
                    transform: translateY(-1px);
                }
            }
        }
    }
}

// 上一篇/下一篇导航
.post-nav {
    display: flex;
    gap: 20px;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);

    .nav-link {
        flex: 1;
        min-width: 0;
        padding: 16px 20px;
        background: var(--bg-primary);
        border-radius: 10px;
        text-decoration: none;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        gap: 6px;

        &:hover {
            background: var(--accent-soft);
            transform: translateY(-2px);
            box-shadow: var(--shadow-card);
        }
    }

    .nav-prev {
        text-align: left;
    }

    .nav-next {
        text-align: right;
    }

    .nav-spacer {
        display: none;
    }

    .nav-label {
        font-size: 12px;
        color: var(--text-muted);
    }

    .nav-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    // 只有一项时撑满
    .nav-link:only-child {
        text-align: center;
    }
}

// 相关推荐
.related-posts {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);

    .related-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 20px 0;
    }

    .related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

// Markdown 样式
:deep(.markdown-body) {
    font-size: 16px;
    line-height: 1.8;
    color: var(--text-primary);

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
        scroll-margin-top: 100px;
    }

    h1 {
        font-size: 2em;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.3em;
    }

    h2 {
        font-size: 1.5em;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.3em;
        margin-top: 32px;
    }

    h3 {
        font-size: 1.25em;
    }

    p {
        margin-bottom: 16px;
    }

    a {
        color: var(--accent-color);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    code {
        padding: 0.2em 0.4em;
        background-color: var(--bg-primary);
        border-radius: 3px;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
        font-size: 85%;
    }

    pre {
        padding: 16px;
        background-color: var(--bg-primary);
        border-radius: 6px;
        overflow-x: auto;

        code {
            padding: 0;
            background-color: transparent;
        }
    }

    blockquote {
        padding: 0 1em;
        color: var(--text-secondary);
        border-left: 0.25em solid var(--accent-color);
        margin: 0 0 16px 0;
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        margin: 32px auto;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    }

    ul,
    ol {
        padding-left: 2em;
        margin-bottom: 16px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 16px;

        th,
        td {
            border: 1px solid var(--border-color);
            padding: 8px 12px;
        }

        th {
            background-color: var(--bg-primary);
        }
    }
}

// 响应式
@media (max-width: 1024px) {
    .toc-sidebar {
        display: none;
    }

    .blog-detail {
        max-width: 900px;
    }
}

@media (max-width: 768px) {
    .blog-detail {
        padding: 20px 16px;
    }

    .post-content {
        padding: 24px 16px;

        .post-header h1 {
            font-size: 24px;
        }
    }

    .post-nav {
        flex-direction: column;

        .nav-link {
            text-align: center;
        }
    }

    .related-posts .related-grid {
        grid-template-columns: 1fr;
    }
}
</style>
