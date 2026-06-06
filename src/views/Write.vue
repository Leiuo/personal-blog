<template>
    <div class="write-page">
        <div class="write-header">
            <h1>撰写文章</h1>
            <p>使用 Markdown 编写博客文章</p>
        </div>

        <div class="write-body">
            <section class="meta-section">
                <h3>文章信息</h3>
                <div class="meta-grid">
                    <div class="form-group">
                        <label>标题</label>
                        <input v-model="title" type="text" placeholder="文章标题" />
                    </div>
                    <div class="form-group">
                        <label>分类</label>
                        <div class="category-input-wrap">
                            <input v-model="category" type="text" placeholder="选择或输入分类"
                                list="category-list" />
                            <datalist id="category-list">
                                <option v-for="cat in blogStore.getAllCategories" :key="cat" :value="cat" />
                            </datalist>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>标签（逗号分隔）</label>
                        <input v-model="tagsInput" type="text" placeholder="Vue, JavaScript, 前端" />
                    </div>
                    <div class="form-group">
                        <label>日期</label>
                        <input v-model="date" type="date" />
                    </div>
                    <div class="form-group">
                        <label>封面图片路径</label>
                        <input v-model="cover" type="text" placeholder="images/cover-xxx.jpg" />
                    </div>
                    <div class="form-group full-width">
                        <label>摘要</label>
                        <textarea v-model="excerpt" rows="2" placeholder="简短描述文章内容..."></textarea>
                    </div>
                </div>
            </section>

            <section class="editor-section">
                <h3>正文内容</h3>
                <MarkdownEditor v-model="content" />
            </section>

            <section class="output-section">
                <h3>生成的 Markdown 文件</h3>
                <div class="output-toolbar">
                    <button class="btn-copy" @click="copyOutput">复制内容</button>
                    <button class="btn-download" @click="downloadMarkdown">下载 .md 文件</button>
                </div>
                <pre class="output-preview"><code>{{ generatedMarkdown }}</code></pre>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

const blogStore = useBlogStore()

const title = ref('')
const category = ref('')
const tagsInput = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const cover = ref('')
const excerpt = ref('')
const content = ref('')

const slug = computed(() => {
    return title.value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w一-龥-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
})

const tags = computed(() => {
    return tagsInput.value
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
})

const generatedMarkdown = computed(() => {
    const frontmatter = [
        '---',
        `title: "${title.value}"`,
        `date: ${date.value}`,
        `category: "${category.value}"`,
        `tags: [${tags.value.map(t => `"${t}"`).join(', ')}]`,
        `excerpt: "${excerpt.value}"`,
    ]
    if (cover.value) {
        frontmatter.push(`cover: "${cover.value}"`)
    }
    frontmatter.push('---')
    frontmatter.push('')
    return frontmatter.join('\n') + content.value
})

const downloadMarkdown = () => {
    const filename = slug.value || 'article'
    const blob = new Blob([generatedMarkdown.value], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.md`
    a.click()
    URL.revokeObjectURL(url)
}

const copyOutput = async () => {
    try {
        await navigator.clipboard.writeText(generatedMarkdown.value)
        alert('已复制到剪贴板')
    } catch {
        const textarea = document.createElement('textarea')
        textarea.value = generatedMarkdown.value
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        alert('已复制到剪贴板')
    }
}

onMounted(() => {
    blogStore.fetchPosts()
})
</script>

<style lang="scss" scoped>
.write-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;

    .write-header {
        text-align: center;
        margin-bottom: 40px;

        h1 {
            font-size: 30px;
            color: var(--accent-color);
            margin-bottom: 10px;
        }

        p {
            color: var(--text-secondary);
            font-size: 16px;
        }
    }

    .write-body {
        section {
            background: var(--bg-secondary);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid var(--border-color);

            h3 {
                margin: 0 0 20px 0;
                padding-bottom: 10px;
                border-bottom: 2px solid var(--accent-color);
                display: inline-block;
                color: var(--text-primary);
            }
        }

        .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 6px;

                label {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-secondary);
                }

                input,
                textarea {
                    padding: 10px 14px;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    font-size: 15px;
                    outline: none;
                    transition: border-color .2s;
                    font-family: inherit;

                    &:focus {
                        border-color: var(--accent-color);
                    }
                }

                textarea {
                    resize: vertical;
                    min-height: 60px;
                }

                &.full-width {
                    grid-column: 1 / -1;
                }
            }
        }

        .output-section {
            .output-toolbar {
                display: flex;
                gap: 10px;
                margin-bottom: 12px;

                button {
                    padding: 8px 20px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background .2s;
                }

                .btn-copy {
                    background: var(--border-color);
                    color: var(--text-primary);

                    &:hover {
                        background: var(--text-muted);
                        color: white;
                    }
                }

                .btn-download {
                    background: var(--accent-color);
                    color: white;

                    &:hover {
                        background: var(--accent-hover);
                    }
                }
            }

            .output-preview {
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                padding: 20px;
                max-height: 400px;
                overflow-y: auto;
                font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
                font-size: 13px;
                line-height: 1.7;
                color: var(--text-primary);
                white-space: pre-wrap;
                word-break: break-word;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 24px 16px;

        .write-body {
            section {
                padding: 20px;
            }

            .meta-grid {
                grid-template-columns: 1fr;
            }
        }
    }
}
</style>
