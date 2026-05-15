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
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    
    progress.value = Math.min(100, Math.max(0, scrollPercent))
    showButton.value = scrollTop > 300
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>