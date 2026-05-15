<template>
    <div class="category-page">
        <div class="category-header">
            <h1>分类：{{ currentCategory }}</h1>
            <p>共 {{ posts.length }} 篇文章</p>
        </div>

        <div class="posts-list" v-if="!loading">
            <BlogCard v-for="post in posts" :key="post.id" :post="post" />
        </div>

        <div v-else class="loading">加载中...</div>

        <div v-if="posts.length === 0 && !loading" class="empty-state">
            <p>暂无文章</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/BlogCard.vue'

const route = useRoute()
const blogStore = useBlogStore()
const loading = ref(false)

const currentCategory = computed(() => route.params.category)

const posts = computed(() => {
    if (!blogStore.posts.length) return []
    return blogStore.posts.filter(post => post.category === currentCategory.value)
})

const loadPosts = async () => {
    loading.value = true
    if (blogStore.posts.length === 0) {
        await blogStore.fetchPosts()
    }
    loading.value = false
}

watch(currentCategory, () => {
    loadPosts()
}, { immediate: true })

onMounted(() => {
    loadPosts()
})
</script>

<style lang="scss" scoped>
.category-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;

    .category-header {
        text-align: center;
        margin-bottom: 50px;

        h1 {
            font-size: 36px;
            color: var(--text-primary);
            margin-bottom: 10px;

            &::before {
                content: '#';
                color: var(--accent-color);
                margin-right: 5px;
            }
        }

        p {
            color: var(--text-secondary);
            font-size: 16px;
        }
    }

    .posts-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 30px;
    }

    .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: var(--bg-secondary);
        border-radius: 12px;
        color: var(--text-muted);
    }
}
</style>