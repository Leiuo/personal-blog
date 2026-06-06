<template>
    <div class="search-page">
        <div class="search-header">
            <h1>搜索结果</h1>
            <p>关键词："{{ keyword }}" - 找到 {{ searchResults.length }} 篇文章</p>
        </div>

        <div class="search-results" v-if="!loading">
            <div v-if="searchResults.length > 0" class="results-list">
                <BlogCard v-for="post in searchResults" :key="post.id" :post="post" class="list-item" />
            </div>
            <div v-else class="empty-state">
                <p>没有找到相关文章</p>
                <router-link to="/" class="back-home">返回首页</router-link>
            </div>
        </div>

        <div v-else class="loading">搜索中...</div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/BlogCard.vue'

const route = useRoute()
const blogStore = useBlogStore()
const loading = ref(false)

const keyword = computed(() => route.query.q || '')

const searchResults = computed(() => blogStore.searchPosts(keyword.value))

const performSearch = async () => {
    loading.value = true
    if (blogStore.posts.length === 0) {
        await blogStore.fetchPosts()
    }
    loading.value = false
}

watch(keyword, () => {
    performSearch()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.search-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;

    .search-header {
        text-align: center;
        margin-bottom: 50px;

        h1 {
            font-size: 30px;
            color: var(--accent-color);
            margin-bottom: 10px;
        }

        p {
            color: var(--text-secondary);
        }
    }

    .search-results {
        .results-list {
            // display: grid;
            // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            // gap: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .list-item {
                margin-bottom: 20px;
                max-width: 800px;
                width: 100%;
            }
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
            background: var(--bg-secondary);
            border-radius: 12px;

            p {
                color: var(--text-muted);
                margin-bottom: 20px;
            }

            .back-home {
                display: inline-block;
                padding: 10px 20px;
                background: var(--accent-color);
                color: white;
                text-decoration: none;
                border-radius: 6px;
                transition: background 0.3s;

                &:hover {
                    background: var(--accent-hover);
                }
            }
        }
    }
}
</style>