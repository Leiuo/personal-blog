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
        <article v-else-if="post" class="post-content">
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

            <div class="post-body markdown-body" v-html="post.contentHtml"></div>

            <footer class="post-footer">
                <div class="tags">
                    <span v-for="tag in post.tags" :key="tag" class="tag">
                        #{{ tag }}
                    </span>
                </div>
            </footer>
        </article>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()
const post = ref(null)
const loading = ref(true)
const error = ref('')

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
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
}

onMounted(() => {
    loadPost()
})
</script>

<style lang="scss" scoped>
.blog-detail {
    max-width: 900px;
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

    .post-content {
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
                }
            }
        }
    }
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
</style>