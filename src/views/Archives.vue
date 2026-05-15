<template>
    <div class="archives-page">
        <div class="archives-header">
            <h1>文章归档</h1>
            <p>共 {{ totalCount }} 篇文章</p>
        </div>

        <div class="archives-content" v-if="!loading">
            <div v-for="group in groupedArchives" :key="group.year" class="archive-year">
                <h2 class="year-title">{{ group.year }}</h2>
                <div class="posts-list">
                    <div v-for="post in group.posts" :key="post.id" class="archive-item" @click="goToPost(post.id)">
                        <div class="post-date">{{ formatDate(post.date) }}</div>
                        <div class="post-title">{{ post.title }}</div>
                        <div class="post-category">{{ post.category }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="loading">加载中...</div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const router = useRouter()
const blogStore = useBlogStore()
const loading = ref(false)

const groupedArchives = computed(() => {
    const posts = blogStore.posts
    const grouped = {}

    posts.forEach(post => {
        const year = new Date(post.date).getFullYear()
        if (!grouped[year]) {
            grouped[year] = []
        }
        grouped[year].push(post)
    })

    // 按年份排序（降序）
    return Object.keys(grouped)
        .sort((a, b) => b - a)
        .map(year => ({
            year,
            posts: grouped[year].sort((a, b) => new Date(b.date) - new Date(a.date))
        }))
})

const totalCount = computed(() => blogStore.posts.length)

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const goToPost = (id) => {
    router.push(`/blog/${id}`)
}

const loadArchives = async () => {
    loading.value = true
    if (blogStore.posts.length === 0) {
        await blogStore.fetchPosts()
    }
    loading.value = false
}

onMounted(() => {
    loadArchives()
})
</script>

<style lang="scss" scoped>
.archives-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;

    .archives-header {
        text-align: center;
        margin-bottom: 50px;

        h1 {
            font-size: 36px;
            color: #333;
            margin-bottom: 10px;
        }

        p {
            color: #666;
        }
    }

    .archives-content {
        background: white;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .archive-year {
            margin-bottom: 40px;

            &:last-child {
                margin-bottom: 0;
            }

            .year-title {
                font-size: 28px;
                color: #4CAF50;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #eee;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 50px;
                    height: 2px;
                    background: #4CAF50;
                }
            }

            .posts-list {
                .archive-item {
                    display: grid;
                    grid-template-columns: 120px 1fr 100px;
                    gap: 20px;
                    padding: 15px;
                    border-bottom: 1px solid #f0f0f0;
                    cursor: pointer;
                    transition: all 0.3s;

                    &:hover {
                        background: #f9f9f9;
                        transform: translateX(5px);

                        .post-title {
                            color: #4CAF50;
                        }
                    }

                    .post-date {
                        color: #999;
                        font-size: 14px;
                    }

                    .post-title {
                        color: #333;
                        font-weight: 500;
                    }

                    .post-category {
                        color: #4CAF50;
                        font-size: 12px;
                        text-align: right;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .archives-content .archive-year .posts-list .archive-item {
            grid-template-columns: 1fr;
            gap: 8px;

            .post-category {
                text-align: left;
            }
        }
    }
}
</style>