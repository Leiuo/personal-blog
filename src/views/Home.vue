<template>
    <div class="home">
        <div class="hero">
            <h1>欢迎来到我的博客</h1>
            <p>分享技术，记录生活，思考人生</p>
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

const categories = computed(() => blogStore.getAllCategories)
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
        background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
        color: white;
        text-align: center;
        padding: 80px 20px;

        h1 {
            font-size: 48px;
            margin: 0 0 20px 0;
        }

        p {
            font-size: 20px;
            opacity: 0.9;
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
        }

        .hero h1 {
            font-size: 32px;
        }
    }
}
</style>