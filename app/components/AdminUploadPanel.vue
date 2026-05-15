<script setup lang="ts">
import { useArticleStore } from '~/store/article'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.query.id as string

const articleStore = useArticleStore()

const publishedImage = defineModel<string>('image', { default: '' })

const uploadedFile = ref<File | null>(null)
const localPreviewBlobUrl = ref('')

let revokeBlob: (() => void) | null = null

const uploading = ref(false)
const uploadError = ref('')

const previewSrc = computed(() => localPreviewBlobUrl.value || publishedImage.value.trim())

watch(uploadedFile, (newFile) => {
    revokeBlob?.()
    revokeBlob = null
    localPreviewBlobUrl.value = ''

    if (!newFile || !import.meta.client) {
        return
    }

    const blob = URL.createObjectURL(newFile)
    localPreviewBlobUrl.value = blob
    revokeBlob = () => {
        URL.revokeObjectURL(blob)
        if (localPreviewBlobUrl.value === blob) {
            localPreviewBlobUrl.value = ''
        }
        revokeBlob = null
    }

    void (async () => {
        uploading.value = true
        uploadError.value = ''
        try {
            const url = await articleStore.uploadArticleImage(newFile, articleId)
            publishedImage.value = url
            if (localPreviewBlobUrl.value === blob) {
                revokeBlob?.()
            }
        } catch (e: unknown) {
            uploadError.value = e instanceof Error ? e.message : 'Upload failed'
        } finally {
            uploading.value = false
        }
    })()
})

onUnmounted(() => {
    revokeBlob?.()
    revokeBlob = null
})

const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        uploadedFile.value = file
    }
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
}

const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer?.files?.[0]
    if (file) {
        uploadedFile.value = file
    }
}
</script>

<template>
    <div class="admin-workspace__panel upload-panel neo-brutal-card">
        <h3 class="admin-workspace__panel-title">
            <Icon :name="materialSymbolName('image')" :size="18" />
            Featured Image
        </h3>
        <div
            class="upload-panel__drop"
            :class="{ 'upload-panel__drop--busy': uploading }"
            @dragover="handleDragOver"
            @drop="handleDrop"
        >
            <input type="file" class="upload-panel__drop-input" accept="image/*" @change="handleFileChange" />
            <Icon :name="materialSymbolName('cloud-upload')" :size="40" class="upload-panel__drop-icon" />
            <p class="admin-workspace__drop-hint">
                {{ uploading ? 'Uploading…' : 'Drag & drop or click' }}
            </p>
            <img
                v-if="previewSrc"
                :src="previewSrc"
                alt=""
                class="upload-panel__drop-preview"
                width="400"
                height="225"
            />
        </div>
        <p v-if="uploadError" class="upload-panel__error">{{ uploadError }}</p>
    </div>
</template>

<style scoped>
.upload-panel__drop-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.upload-panel__drop {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 16 / 10;
    border: 2px dashed var(--color-outline-variant);
    border-radius: var(--radius-md);
    cursor: pointer;
    overflow: hidden;
    transition: background-color var(--transition-fast);
}

.upload-panel__drop--busy {
    pointer-events: none;
    opacity: 0.75;
}

.upload-panel__drop:hover {
    background-color: rgba(237, 237, 244, 0.5);
}

.upload-panel__drop-icon {
    color: var(--color-primary);
    opacity: 0.2;
    transition: transform var(--transition-fast);
}

.upload-panel__drop:hover .upload-panel__drop-icon {
    transform: scale(1.08);
}

.admin-workspace__drop-hint {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    letter-spacing: var(--type-label-caps-spacing);
    text-transform: uppercase;
    margin-top: 8px;
    opacity: 0.4;
    color: var(--color-primary);
}

.upload-panel__drop-preview {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
    transition: opacity var(--transition-fast);
}

.upload-panel__drop:hover .upload-panel__drop-preview {
    opacity: 0.35;
}

.upload-panel__error {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--color-error, #b00020);
    margin-top: 8px;
    margin-bottom: 0;
}
</style>
