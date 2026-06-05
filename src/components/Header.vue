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

            <!-- 移动端菜单按钮 -->
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
const mobileMenuOpen = ref(false)  // 移动端菜单状态

const handleSearch = () => {
    if (searchKeyword.value.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchKeyword.value)}`)  // 跳转到搜索结果页
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
    transition: background-color var(--transition-normal), box-shadow var(--transition-normal);  // 平滑过渡背景色和阴影

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
                color: var(--text-primary);  // 使用文本主色作为导航链接颜色
                font-weight: 500;
                transition: color var(--transition-fast);  // 平滑过渡颜色

                &:hover,
                &.router-link-active {
                    color: var(--accent-color);  // 使用强调色作为悬停和激活状态的颜色
                }
            }
        }

        .search-bar {
            display: flex;
            gap: 10px;

            input {
                padding: 8px 12px;
                border: 1px solid var(--border-color);  // 使用边框颜色变量
                border-radius: 6px;
                outline: none;
                background: var(--bg-secondary);  // 使用背景次级色作为输入框背景
                color: var(--text-primary);  // 使用文本主色作为输入框文字颜色

                &:focus {
                    border-color: var(--accent-color);  // 使用强调色作为输入框聚焦时的边框颜色
                }
            }

            button {
                padding: 8px 16px;
                background: var(--accent-color);  // 使用强调色作为按钮背景
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;

                &:hover {
                    background: var(--accent-hover);  // 使用强调色悬停状态的颜色作为按钮悬停时的背景
                }
            }
        }

        .theme-toggle {
            width: 40px;
            height: 40px;
            border: 1px solid var(--border-color);  // 使用边框颜色变量
            border-radius: 50%;
            background: var(--bg-secondary);  // 使用背景次级色作为主题切换按钮背景
            color: var(--text-primary);  // 使用文本主色作为主题切换按钮图标颜色
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            transition: border-color var(--transition-fast), background var(--transition-fast);  // 平滑过渡边框颜色和背景色

            &:hover {
                border-color: var(--accent-color);  // 使用强调色作为主题切换按钮悬停时的边框颜色
                background: var(--bg-primary);  // 使用背景主色作为主题切换按钮悬停时的背景颜色
            }
        }

        .mobile-menu-btn {
            display: none;
            width: 40px;
            height: 40px;
            border: none;
            background: none;
            cursor: pointer;
            color: var(--text-primary);  // 使用文本主色作为移动菜单按钮图标颜色
            align-items: center;
            justify-content: center;
            padding: 0;
            border-radius: 8px;
            transition: background var(--transition-fast);  // 平滑过渡背景色

            &:hover {
                background: var(--bg-primary);  // 使用背景主色作为移动菜单按钮悬停时的背景颜色
            }
        }
    }

    .mobile-menu {
        display: none;
        flex-direction: column;
        background: var(--bg-secondary);  // 使用背景次级色作为移动菜单背景
        padding: 20px;
        gap: 15px;
        border-top: 1px solid var(--border-color);  // 使用边框颜色变量作为移动菜单顶部边框颜色
        transition: background-color var(--transition-normal);  // 平滑过渡背景色

        a {
            text-decoration: none;
            color: var(--text-primary);  // 使用文本主色作为移动菜单链接颜色
            padding: 10px;
            transition: color var(--transition-fast);  // 平滑过渡颜色

            &:hover {
                color: var(--accent-color);  // 使用强调色作为移动菜单链接悬停时的颜色
            }
        }
    }

    // 响应式设计：在小屏幕上隐藏导航和搜索，显示移动菜单按钮
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