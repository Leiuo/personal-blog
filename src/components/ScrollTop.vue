<template>
    <!-- 阅读进度条 -->
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    
    <!-- 回到顶部按钮 -->
    <button class="back-to-top" :class="{ show: showButton }" @click="scrollToTop">
        ↑
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)
const progress = ref(0)

const handleScroll = () => {
    const scrollTop = window.scrollY  // 获取当前滚动位置
    const docHeight = document.documentElement.scrollHeight - window.innerHeight  // 计算文档总高度减去视口高度，得到可滚动的总高度
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0  // 计算滚动百分比，避免除以零
    
    progress.value = Math.min(100, Math.max(0, scrollPercent))  // 确保进度值在0到100之间
    showButton.value = scrollTop > 300  // 当滚动超过300px时显示回到顶部按钮
}

const scrollToTop = () => {
    // 平滑滚动回到顶部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// 监听页面滚动事件，更新进度条和按钮显示状态
onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

// 组件卸载时移除事件监听，避免内存泄漏
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>