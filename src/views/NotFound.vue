<template>
    <div class="not-found">
        <h1>404</h1>
        <p>页面不存在</p>
        <router-link to="/" class="back-link">返回首页</router-link>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.not-found {
    text-align: center;
    padding: 120px 20px;

    h1 {
        font-size: 64px;
        font-weight: 700;
        color: var(--accent-color);
        margin: 0 0 12px 0;
        line-height: 1;
    }

    p {
        color: var(--text-secondary);
        font-size: 18px;
        margin: 0 0 32px 0;
    }

    .back-link {
        display: inline-block;
        padding: 10px 28px;
        background: var(--accent-color);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-size: 15px;
        transition: background 0.2s;

        &:hover {
            background: var(--accent-hover);
        }
    }
}
</style>
