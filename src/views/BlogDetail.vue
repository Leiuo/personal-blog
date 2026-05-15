<template>
    <div class="blog-detail" v-if="post">
        <article class="post-content">
            <header class="post-header">
                <h1>{{ post.title }}</h1>
                <div class="post-meta">
                    <span>📅 {{ formatDate(post.date) }}</span>
                    <span>📂 {{ post.category }}</span>
                    <span>⏱️ {{ post.readingTime }} 分钟阅读</span>
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

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const loadPost = async () => {
    const id = route.params.id
    post.value = await blogStore.fetchPostById(id)
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
                font-size: 36px;
                margin: 0 0 20px 0;
                color: var(--text-primary);
            }

            .post-meta {
                color: var(--text-secondary);
                display: flex;
                gap: 20px;
                font-size: 14px;
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
        max-width: 100%;
        border-radius: 8px;
        margin: 20px 0;
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