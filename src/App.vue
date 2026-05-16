<template>
    <div id="app">
        <Header />
        <ScrollTop />
        <main class="main-content">
            <!-- <router-view /> -->

            <!-- <transition name="fade" mode="out-in">
                <router-view />
            </transition> -->

            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="$route.fullPath" />
                </transition>
            </router-view>
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ScrollTop from '@/components/ScrollTop.vue'
</script>

<style>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-content {
    flex: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>