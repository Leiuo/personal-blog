<template>
    <header class="header">
        <div class="header-container">
            <div class="logo" @click="router.push('/')">
                <h1>{{ blogTitle }}</h1>
            </div>

            <nav class="nav">
                <router-link to="/" class="nav-link">首页</router-link>
                <router-link to="/archives" class="nav-link">归档</router-link>
                <router-link to="/about" class="nav-link">关于</router-link>
            </nav>

            <div class="search-bar">
                <input type="text" v-model="searchKeyword" @keyup.enter="handleSearch" placeholder="搜索文章...">
                <button @click="handleSearch">搜索</button>
            </div>

            <button class="theme-toggle" @click="blogStore.toggleDarkMode" :title="blogStore.isDarkMode ? '切换到浅色模式' : '切换到深色模式'">
                <svg v-if="blogStore.isDarkMode" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            </button>

            <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="菜单">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M3 6h18"/>
                    <path d="M3 12h18"/>
                    <path d="M3 18h18"/>
                </svg>
            </button>
        </div>

        <!-- 移动端菜单 -->
        <div class="mobile-menu" v-show="mobileMenuOpen">
            <router-link to="/" @click="closeMobileMenu">首页</router-link>
            <router-link to="/archives" @click="closeMobileMenu">归档</router-link>
            <router-link to="/about" @click="closeMobileMenu">关于</router-link>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const router = useRouter()
const blogStore = useBlogStore()
const blogTitle = ref('个人博客')
const searchKeyword = ref('')
const mobileMenuOpen = ref(false)

const handleSearch = () => {
    if (searchKeyword.value.trim()) {
        router.push(`/search?q=${searchKeyword.value}`)
        searchKeyword.value = ''
    }
}

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
.header {
    background: var(--bg-secondary);
    box-shadow: var(--shadow-light);
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: background-color var(--transition-normal), box-shadow var(--transition-normal);

    .header-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;

        .logo {
            cursor: pointer;

            h1 {
                font-size: 24px;
                color: var(--accent-color);
                margin: 0;
            }
        }

        .nav {
            display: flex;
            gap: 30px;

            .nav-link {
                text-decoration: none;
                color: var(--text-primary);
                font-weight: 500;
                transition: color var(--transition-fast);

                &:hover,
                &.router-link-active {
                    color: var(--accent-color);
                }
            }
        }

        .search-bar {
            display: flex;
            gap: 10px;

            input {
                padding: 8px 12px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                outline: none;
                background: var(--bg-secondary);
                color: var(--text-primary);

                &:focus {
                    border-color: var(--accent-color);
                }
            }

            button {
                padding: 8px 16px;
                background: var(--accent-color);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;

                &:hover {
                    background: var(--accent-hover);
                }
            }
        }

        .theme-toggle {
            width: 40px;
            height: 40px;
            border: 1px solid var(--border-color);
            border-radius: 50%;
            background: var(--bg-secondary);
            color: var(--text-primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            transition: border-color var(--transition-fast), background var(--transition-fast);

            &:hover {
                border-color: var(--accent-color);
                background: var(--bg-primary);
            }
        }

        .mobile-menu-btn {
            display: none;
            width: 40px;
            height: 40px;
            border: none;
            background: none;
            cursor: pointer;
            color: var(--text-primary);
            align-items: center;
            justify-content: center;
            padding: 0;
            border-radius: 8px;
            transition: background var(--transition-fast);

            &:hover {
                background: var(--bg-primary);
            }
        }
    }

    .mobile-menu {
        display: none;
        flex-direction: column;
        background: var(--bg-secondary);
        padding: 20px;
        gap: 15px;
        border-top: 1px solid var(--border-color);
        transition: background-color var(--transition-normal);

        a {
            text-decoration: none;
            color: var(--text-primary);
            padding: 10px;
            transition: color var(--transition-fast);

            &:hover {
                color: var(--accent-color);
            }
        }
    }

    @media (max-width: 768px) {

        .nav,
        .search-bar,
        .theme-toggle {
            display: none;
        }

        .mobile-menu-btn {
            display: flex !important;
        }

        .mobile-menu {
            display: flex;
        }
    }
}
</style>