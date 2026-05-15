<template>
    <div class="markdown-editor">
        <div class="editor-toolbar">
            <button @click="insertMarkdown('**', '**')">粗体</button>
            <button @click="insertMarkdown('*', '*')">斜体</button>
            <button @click="insertMarkdown('[', '](url)')">链接</button>
            <button @click="insertMarkdown('![', '](url)')">图片</button>
            <button @click="insertMarkdown('```\n', '\n```')">代码块</button>
        </div>

        <div class="editor-container">
            <textarea v-model="content" @input="updatePreview" class="editor-input"
                placeholder="使用 Markdown 编写文章..."></textarea>

            <div class="editor-preview markdown-body" v-html="previewHtml"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { parseMarkdown } from '@/utils/markdown'

const props = defineProps({
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue || '')
const previewHtml = ref('')

const updatePreview = () => {
    previewHtml.value = parseMarkdown(content.value)
    emit('update:modelValue', content.value)
}

const insertMarkdown = (before, after) => {
    const textarea = document.querySelector('.editor-input')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.value.substring(start, end)

    const newText = content.value.substring(0, start) +
        before + selectedText + after +
        content.value.substring(end)

    content.value = newText
    updatePreview()

    // 恢复光标位置
    setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
}

watch(() => props.modelValue, (newVal) => {
    if (newVal !== content.value) {
        content.value = newVal
        updatePreview()
    }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.markdown-editor {
    .editor-toolbar {
        padding: 10px;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px 4px 0 0;

        button {
            margin-right: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }
    }

    .editor-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        height: 500px;

        .editor-input {
            width: 100%;
            height: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 0 0 4px 4px;
            font-family: monospace;
            resize: vertical;
        }

        .editor-preview {
            height: 100%;
            overflow-y: auto;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 0 0 4px 4px;
            background: white;
        }
    }
}
</style>