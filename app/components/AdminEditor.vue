<script setup lang="ts">
const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const body = ref(props.modelValue)

watch(body, (newVal) => {
    emit('update:modelValue', newVal)
})

watch(() => props.modelValue, (newVal) => {
    body.value = newVal
}, { immediate: true })

</script>

<template>
    <div class="admin-workspace__editor neo-brutal-card">
        <div class="admin-workspace__toolbar">
            <button type="button" class="admin-workspace__tool" aria-label="Bold">
                <Icon :name="materialSymbolName('format-bold')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Italic">
                <Icon :name="materialSymbolName('format-italic')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Heading 1">
                <Icon :name="materialSymbolName('format-h1')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Heading 2">
                <Icon :name="materialSymbolName('format-h2')" />
            </button>
            <span class="admin-workspace__tool-divider" aria-hidden="true" />
            <button type="button" class="admin-workspace__tool" aria-label="Bullet list">
                <Icon :name="materialSymbolName('format-list-bulleted')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Link">
                <Icon :name="materialSymbolName('link')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Image">
                <Icon :name="materialSymbolName('image')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Code block">
                <Icon :name="materialSymbolName('code-blocks')" />
            </button>
            <div class="admin-workspace__toolbar-spacer" />
            <button type="button" class="admin-workspace__tool" aria-label="Undo">
                <Icon :name="materialSymbolName('undo')" />
            </button>
            <button type="button" class="admin-workspace__tool" aria-label="Redo">
                <Icon :name="materialSymbolName('redo')" />
            </button>
        </div>
        <textarea v-model="body" class="admin-workspace__textarea" rows="14"
            placeholder="Once upon a time in the digital wilderniss..." />
    </div>
</template>

<style scoped>
.admin-workspace__editor {
    display: flex;
    flex-direction: column;
    min-height: 400px;
    border-radius: var(--radius-md);
    overflow: hidden;
    padding: 0;
}

.admin-workspace__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-bottom: 2px solid var(--color-primary);
    background-color: rgba(237, 237, 244, 0.35);
}

.admin-workspace__tool {
    padding: 8px;
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    color: var(--color-primary);
    transition:
        background-color var(--transition-fast),
        border-color var(--transition-fast);
}

.admin-workspace__tool:hover {
    background-color: rgba(0, 100, 149, 0.08);
    border-color: rgba(0, 100, 149, 0.15);
}

.admin-workspace__tool-divider {
    width: 2px;
    height: 24px;
    background-color: rgba(0, 100, 149, 0.15);
    margin: 0 8px;
}

.admin-workspace__toolbar-spacer {
    flex: 1;
    min-width: 8px;
}

.admin-workspace__textarea {
    flex: 1;
    width: 100%;
    padding: var(--space-stack-md);
    border: none;
    resize: vertical;
    min-height: 320px;
    font-family: var(--font-body);
    font-size: var(--type-body-lg-size);
    line-height: var(--type-body-lg-lh);
    color: var(--color-on-surface);
    background-color: var(--color-surface-container-lowest);
}

.admin-workspace__textarea::placeholder {
    color: var(--color-primary);
    opacity: 0.4;
    font-style: italic;
}

.admin-workspace__textarea:focus {
    outline: none;
}
</style>