<template>
    <div class="blog-card" @click="goToDetail">
        <!-- 封面图区域 -->
        <div class="card-cover" v-if="post.cover">
            <img :src="post.cover" :alt="post.title" loading="lazy">
            <div class="cover-overlay">
                <span class="read-icon">📖</span>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="card-content">
            <!-- 文章元信息 -->
            <div class="post-meta">
                <span class="post-date">
                    <svg class="icon" viewBox="0 0 24 24" width="14" height="14">
                        <path
                            d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                    </svg>
                    {{ formatDate(post.date) }}
                </span>

                <span class="post-category" :style="{ backgroundColor: categoryColor }" @click.stop="goToCategory">
                    {{ post.category }}
                </span>
            </div>

            <!-- 文章标题 -->
            <h3 class="post-title">{{ post.title }}</h3>

            <!-- 文章摘要 -->
            <p class="post-excerpt">{{ post.excerpt || getExcerpt(post.content) }}</p>

            <!-- 文章标签 -->
            <div class="post-tags" v-if="post.tags && post.tags.length">
                <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag" @click.stop="goToTag(tag)">
                    #{{ tag }}
                </span>
                <span v-if="post.tags.length > 3" class="tag-more">+{{ post.tags.length - 3 }}</span>
            </div>

            <!-- 底部统计信息 -->
            <div class="post-footer">
                <div class="post-stats">
                    <span class="stat-item">
                        <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        {{ post.views || 0 }}
                    </span>
                    <span class="stat-item">
                        <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M21 6h-2v2h-2V6h-2V4h2V2h2v2h2v2zm-10 3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-2.33 0-7 1.17-7 3.5V17h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        {{ post.comments || 0 }}
                    </span>
                    <span class="stat-item" v-if="post.likes">
                        <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {{ post.likes }}
                    </span>
                </div>

                <div class="read-more">
                    阅读更多
                    <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    post: {
        type: Object,
        required: true,
        validator: (value) => {
            return value.id && value.title
        }
    }
})

const router = useRouter()

// 分类颜色映射
const categoryColor = computed(() => {
    const colors = {
        '技术': '#4CAF50',
        '生活': '#FF9800',
        '随笔': '#9C27B0',
        '旅行': '#2196F3',
        '前端': '#E91E63',
        '后端': '#00BCD4',
        '人工智能': '#3F51B5',
        '读书笔记': '#795548'
    }
    return colors[props.post.category] || '#607D8B'
})

// 格式化日期
const formatDate = (date) => {
    if (!date) return '暂无日期'

    const d = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now - d)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // 如果是最近7天，显示相对时间
    if (diffDays <= 7) {
        if (diffDays === 0) return '今天'
        if (diffDays === 1) return '昨天'
        return `${diffDays}天前`
    }

    // 否则显示具体日期
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

// 获取文章摘要（如果没有提供excerpt）
const getExcerpt = (content) => {
    if (!content) return '暂无摘要'
    // 移除HTML标签，获取纯文本
    const text = content.replace(/<[^>]*>/g, '')
    // 截取前150个字符
    return text.length > 150 ? text.substring(0, 150) + '...' : text
}

// 跳转到文章详情
const goToDetail = () => {
    router.push(`/blog/${props.post.id}`)
}

// 跳转到分类页面
const goToCategory = (e) => {
    e.stopPropagation()
    router.push(`/category/${props.post.category}`)
}

// 跳转到标签搜索
const goToTag = (tag, e) => {
    e.stopPropagation()
    router.push(`/search?q=${tag}`)
}
</script>

<style lang="scss" scoped>
.blog-card {
    background: var(--bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-light);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

        .card-cover img {
            transform: scale(1.05);
        }

        .cover-overlay {
            opacity: 1;
        }

        .read-more {
            transform: translateX(5px);
            color: var(--accent-color);
        }
    }

    .card-cover {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: var(--bg-primary);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .cover-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;

            .read-icon {
                color: white;
                font-size: 32px;
                animation: pulse 1.5s ease infinite;
            }
        }
    }

    .card-content {
        padding: 20px;

        .post-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            font-size: 13px;

            .post-date {
                display: flex;
                align-items: center;
                gap: 4px;
                color: var(--text-muted);

                .icon {
                    fill: currentColor;
                }
            }

            .post-category {
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                transition: transform 0.2s;
                cursor: pointer;

                &:hover {
                    transform: scale(1.05);
                }
            }
        }

        .post-title {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: var(--text-primary);
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            transition: color 0.3s;

            &:hover {
                color: var(--accent-color);
            }
        }

        .post-excerpt {
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 16px;
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;

            .tag,
            .tag-more {
                background: var(--bg-primary);
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 11px;
                color: var(--text-secondary);
                transition: all 0.2s;
                cursor: pointer;

                &:hover {
                    background: var(--accent-color);
                    color: white;
                    transform: translateY(-1px);
                }
            }

            .tag-more {
                cursor: default;

                &:hover {
                    background: var(--bg-primary);
                    color: var(--text-secondary);
                    transform: none;
                }
            }
        }

        .post-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid var(--border-color);

            .post-stats {
                display: flex;
                gap: 16px;

                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: var(--text-muted);
                    font-size: 13px;

                    .icon {
                        fill: currentColor;
                    }
                }
            }

            .read-more {
                display: flex;
                align-items: center;
                gap: 4px;
                color: var(--text-muted);
                font-size: 13px;
                font-weight: 500;
                transition: all 0.3s;

                .arrow-icon {
                    fill: currentColor;
                    transition: transform 0.3s;
                }
            }
        }
    }
}

// 动画定义
@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}

// 响应式设计
@media (max-width: 768px) {
    .blog-card {
        .card-cover {
            height: 180px;
        }

        .card-content {
            padding: 16px;

            .post-title {
                font-size: 16px;
            }

            .post-excerpt {
                font-size: 13px;
                -webkit-line-clamp: 2;
            }

            .post-footer {
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }
        }
    }
}

// 暗色主题支持（可选）
@media (prefers-color-scheme: dark) {
    .blog-card {
        background: #2c2c2c;

        .card-content {
            .post-title {
                color: #e0e0e0;
            }

            .post-excerpt {
                color: #b0b0b0;
            }

            .post-tags .tag {
                background: #3a3a3a;
                color: #b0b0b0;
            }

            .post-footer {
                border-top-color: #3a3a3a;
            }
        }
    }
}
</style>