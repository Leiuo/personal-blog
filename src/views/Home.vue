<template>
    <div class="home">
        <div class="hero">
            <div class="hero-inner">
                <div class="hero-text">
                    <div class="hero-greeting">
                        <span class="accent-bar"></span>
                        <span>欢迎来到我的博客</span>
                    </div>
                    <p class="hero-subtitle">分享技术，记录生活，思考人生</p>
                    <div class="hero-stats">
                        <span class="stat"><strong>{{ postCount }}</strong> 篇文章</span>
                        <span class="stat-sep">/</span>
                        <span class="stat"><strong>{{ categoryCount }}</strong> 个分类</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="main-content">
                <div class="posts-grid" v-if="!blogStore.loading">
                    <BlogCard v-for="post in blogStore.posts" :key="post.id" :post="post" />
                </div>
                <div v-else class="loading">加载中...</div>
            </div>

            <aside class="sidebar">
                <div class="sidebar-widget">
                    <h3>分类</h3>
                    <ul class="category-list">
                        <li v-for="category in categories" :key="category"
                            @click="router.push(`/category/${category}`)">
                            {{ category }}
                            <span class="count">({{ getCategoryCount(category) }})</span>
                        </li>
                    </ul>
                </div>

                <div class="sidebar-widget">
                    <h3>热门文章</h3>
                    <ul class="hot-posts">
                        <li v-for="post in hotPosts" :key="post.id">
                            <router-link :to="`/blog/${post.id}`">
                                {{ post.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/BlogCard.vue'

const router = useRouter()
const blogStore = useBlogStore()

const postCount = computed(() => blogStore.posts.length)
const categories = computed(() => blogStore.getAllCategories)
const categoryCount = computed(() => blogStore.getAllCategories.length)
const hotPosts = computed(() =>
    [...blogStore.posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
)

const getCategoryCount = (category) => {
    return blogStore.posts.filter(post => post.category === category).length
}

onMounted(() => {
    blogStore.fetchPosts()
})
</script>

<style lang="scss" scoped>
.home {
    .hero {
        background: linear-gradient(160deg, var(--bg-secondary) 0%, var(--bg-primary) 50%);

        .hero-inner {
            max-width: 800px;
            margin: 0 auto;
            padding: 72px 20px 56px;
        }

        .hero-greeting {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;

            span {
                font-size: 32px;
                font-weight: 700;
                color: var(--accent-color);
                letter-spacing: 1px;
            }

            .accent-bar {
                display: block;
                width: 4px;
                height: 32px;
                background: var(--accent-color);
                border-radius: 2px;
                flex-shrink: 0;
            }
        }

        .hero-subtitle {
            font-size: 17px;
            color: var(--text-secondary);
            margin: 0 0 28px 0;
            padding-left: 20px;
        }

        .hero-stats {
            display: flex;
            align-items: center;
            gap: 12px;
            padding-left: 20px;
            font-size: 14px;
            color: var(--text-muted);

            strong {
                color: var(--accent-color);
                font-size: 18px;
                font-weight: 700;
            }

            .stat-sep {
                color: var(--border-color);
            }
        }
    }

    .content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 40px;

        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 30px;
        }

        .sidebar {
            position: sticky;
            top: 90px;
            align-self: start;

            .sidebar-widget {
                background: var(--bg-secondary);
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 30px;
                border: 1px solid var(--border-color);

                h3 {
                    margin: 0 0 15px 0;
                    padding-bottom: 10px;
                    border-bottom: 2px solid var(--accent-color);
                    color: var(--text-primary);
                }

                .category-list,
                .hot-posts {
                    list-style: none;
                    padding: 0;

                    li {
                        padding: 8px 0;
                        cursor: pointer;
                        color: var(--text-secondary);
                        transition: color var(--transition-fast);

                        &:hover {
                            color: var(--accent-color);
                        }

                        a {
                            text-decoration: none;
                            color: inherit;
                        }

                        .count {
                            color: var(--text-muted);
                            margin-left: 5px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            grid-template-columns: 1fr;

            .sidebar {
                position: static;
                border-left: none;
                padding-left: 0;
            }
        }

        .hero {
            .hero-inner {
                padding: 48px 20px 40px;
            }

            .hero-greeting span {
                font-size: 24px;
            }

            .hero-subtitle {
                font-size: 15px;
            }
        }
    }
}
</style>