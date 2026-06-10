import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue({
        include: [/\.vue$/, /\.md$/] // 允许导入 .md 文件
    })],
    base: process.env.VERCEL ? '/' : '/personal-blog/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@posts': path.resolve(__dirname, './public/posts') // 文章目录别名
        }
    },
    server: {
        port: 3001,
        open: true
    }
})