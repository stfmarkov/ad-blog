<script setup lang="ts">

import { useArticleStore } from '~/store/article'
import type { Category, Tag } from '~/store/article'

const articleStore = useArticleStore()
const article = computed(() => articleStore.article)

const props = defineProps<{
  isEditing: boolean
}>()

const addDays = (base: Date, days: number): Date => {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d
}

const formatYmd = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const defaultPublishDateYmd = computed(() => formatYmd(addDays(new Date(), 7)))
const title = ref('')
const category = ref<Category>('rides')
const body = ref('')
const tags = ref<Tag[]>([])
const tagInput = ref('')
const publishDate = ref(defaultPublishDateYmd.value)
/** Optional featured image URL; omitted from UI when empty. */
const image = ref('')
const saving = ref(false)

const resetNewArticleForm = () => {
  title.value = ''
  category.value = 'rides'
  body.value = ''
  tags.value = []
  tagInput.value = ''
  image.value = ''
  publishDate.value = defaultPublishDateYmd.value
}

const addTag = () => {
  const t = tagInput.value.trim().toUpperCase()
  if (!t) return
  tags.value.push({
    id: crypto.randomUUID(),
    label: t,
    tone: 'code',
  })
  tagInput.value = ''
}

const removeTag = (id: string) => {
  tags.value = tags.value.filter((x) => x.id !== id)
}

watch(
  () => props.isEditing,
  (editing) => {
    if (!editing) resetNewArticleForm()
  },
  { immediate: true },
)

watch(article, (newVal) => {
  if (!newVal) return

  if (props.isEditing) {
    title.value = newVal.title || ''
    category.value = newVal.category || 'rides'
    body.value = newVal.content || ''
    tags.value = (newVal.tags ?? []).map((t) => ({ id: t, label: t, tone: 'code' }))
    publishDate.value = Number.isNaN(newVal.publishDate.getTime())
      ? defaultPublishDateYmd.value
      : formatYmd(newVal.publishDate)
    image.value = newVal.image || ''
  }
}, { deep: true, immediate: true })

const submitCreate = async () => {
  if (props.isEditing || saving.value) return

  saving.value = true
  try {
    const dateAtNoon = new Date(`${publishDate.value}T12:00:00`)
    const publishIso = Number.isNaN(dateAtNoon.getTime())
      ? new Date().toISOString()
      : dateAtNoon.toISOString()

    const id = await articleStore.createArticle({
      author_id: '1',
      title: title.value,
      content: body.value,
      tags: tags.value.map((t) => t.label),
      category: category.value,
      image: image.value.trim(),
      status: 'draft',
      publish_date: publishIso,
      views: 0,
    })

    await navigateTo({ path: '/admin/editor', query: { id } })
  }
  finally {
    saving.value = false
  }
}

defineExpose({ submitCreate })

const handleCategoryUpdate = (value: Category) => {
  category.value = value
}

</script>

<template>
  <div class="admin-workspace">
    <div class="admin-workspace__main">
      <div class="admin-workspace__block neo-brutal-card">
        <label class="admin-workspace__label" for="admin-article-title">Article Title</label>
        <input id="admin-article-title" v-model="title" type="text" class="admin-workspace__title-input"
          placeholder="Enter a compelling title..." autocomplete="off" />
      </div>

      <div class="admin-workspace__cats">
        <AdminCatButton color="rides" :active="category === 'rides'" label="RIDES" icon="two-wheeler"
          @update:active="handleCategoryUpdate('rides')" />
        <AdminCatButton color="code" :active="category === 'code'" label="CODE" icon="terminal"
          @update:active="handleCategoryUpdate('code')" />
        <AdminCatButton color="quests" :active="category === 'quests'" label="QUESTS" icon="explore"
          @update:active="handleCategoryUpdate('quests')" />
      </div>

      <AdminEditor v-model="body" />
    </div>

    <aside class="admin-workspace__aside">
      <AdminUploadPanel v-model:image="image" />

      <div class="admin-workspace__panel neo-brutal-card">
        <h3 class="admin-workspace__panel-title">
          <Icon :name="materialSymbolName('label')" :size="18" />
          Tags
        </h3>
        <div class="admin-workspace__tags">
          <span v-for="t in tags" :key="t.id" class="admin-workspace__tag"
            :class="t.tone === 'rides' ? 'admin-workspace__tag--rides' : 'admin-workspace__tag--code'">
            {{ t.label }}
            <button type="button" class="admin-workspace__tag-x" @click="removeTag(t.id)">
              <Icon :name="materialSymbolName('close')" :size="14" />
            </button>
          </span>
        </div>
        <div class="admin-workspace__tag-row">
          <input v-model="tagInput" type="text" class="admin-workspace__tag-input" placeholder="Add a tag..."
            @keydown.enter.prevent="addTag" />
          <button type="button" class="admin-workspace__tag-add" @click="addTag">
            Add
          </button>
        </div>
      </div>

      <div class="admin-workspace__panel neo-brutal-card">
        <h3 class="admin-workspace__panel-title">
          <Icon :name="materialSymbolName('schedule')" :size="18" />
          Post Settings
        </h3>
        <div class="admin-workspace__settings">
          <div>
            <label class="admin-workspace__field-label" for="admin-publish-date">Publish date</label>
            <div class="admin-workspace__date-wrap">
              <input id="admin-publish-date" v-model="publishDate" type="date" class="admin-workspace__date" />
              <Icon :name="materialSymbolName('calendar-today')" :size="18" class="admin-workspace__date-icon" />
            </div>
          </div>
          <div class="admin-workspace__mini-row">
            <span class="admin-workspace__mini-row-inner">
              <Icon :name="materialSymbolName('visibility')" :size="18" />
              <span class="admin-workspace__mini-text">Visibility: Public</span>
            </span>
            <button type="button" class="admin-workspace__edit-link">Edit</button>
          </div>
          <div class="admin-workspace__mini-row">
            <span class="admin-workspace__mini-row-inner">
              <Icon :name="materialSymbolName('person')" :size="18" />
              <span class="admin-workspace__mini-text">Author: Nerd_One</span>
            </span>
            <button type="button" class="admin-workspace__edit-link">Edit</button>
          </div>
        </div>
      </div>

      <div class="admin-workspace__danger" v-if="isEditing">
        <button type="button" class="admin-workspace__trash">
          <Icon :name="materialSymbolName('delete')" :size="18" />
          Move to Trash
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.admin-workspace {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-stack-lg);
}

@media (min-width: 1024px) {
  .admin-workspace {
    grid-template-columns: 8fr 4fr;
    align-items: start;
  }
}

.admin-workspace__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}

.admin-workspace__block {
  padding: 24px;
  border-radius: var(--radius-md);
}

.admin-workspace__label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  opacity: 0.6;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.admin-workspace__title-input {
  width: 100%;
  font-family: var(--font-display);
  font-size: var(--type-headline-md-size);
  font-weight: var(--type-headline-md-weight);
  border: none;
  border-bottom: 2px solid var(--color-outline-variant);
  padding-bottom: 8px;
  background: transparent;
  color: var(--color-primary);
}

.admin-workspace__title-input:focus {
  outline: none;
  border-bottom-color: var(--color-primary);
}

.admin-workspace__title-input::placeholder {
  color: var(--color-primary);
  opacity: 0.3;
}

.admin-workspace__cats {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-stack-md);
}

@media (min-width: 640px) {
  .admin-workspace__cats {
    grid-template-columns: repeat(3, 1fr);
  }
}

.admin-workspace__aside {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}

.admin-workspace__panel {
  padding: var(--space-stack-md);
  border-radius: var(--radius-md);
}

:deep(.admin-workspace__panel-title) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.admin-workspace__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.admin-workspace__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.admin-workspace__tag--rides {
  background-color: rgba(255, 145, 77, 0.1);
  color: var(--color-rides);
  border: 1px solid var(--color-rides);
}

.admin-workspace__tag--code {
  background-color: rgba(0, 191, 255, 0.1);
  color: var(--color-code);
  border: 1px solid var(--color-code);
}

.admin-workspace__tag-x {
  display: flex;
  padding: 0;
  color: inherit;
  opacity: 0.8;
}

.admin-workspace__tag-row {
  display: flex;
}

.admin-workspace__tag-input {
  flex: 1;
  padding: 8px;
  border: 2px solid var(--color-primary);
  border-right: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-primary);
  background-color: var(--color-surface-container-lowest);
}

.admin-workspace__tag-input:focus {
  outline: none;
}

.admin-workspace__tag-add {
  padding: 8px 16px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
}

.admin-workspace__settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.admin-workspace__field-label) {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  opacity: 0.5;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.admin-workspace__date-wrap {
  position: relative;
}

.admin-workspace__date {
  width: 100%;
  padding: 8px;
  border: 2px solid var(--color-outline-variant);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-primary);
  background-color: transparent;
}

.admin-workspace__date:focus {
  outline: none;
  border-color: var(--color-primary);
}

.admin-workspace__date-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-primary);
  opacity: 0.6;
}

.admin-workspace__mini-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 2px solid var(--color-surface-container);
  background-color: rgba(237, 237, 244, 0.25);
}

.admin-workspace__mini-row-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
}

.admin-workspace__mini-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.admin-workspace__edit-link {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  text-decoration: underline;
  color: var(--color-rides);
}

.admin-workspace__danger {
  border: 2px dashed var(--color-error);
  padding: var(--space-stack-md);
}

.admin-workspace__trash {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid var(--color-error);
  color: var(--color-error);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.admin-workspace__trash:hover {
  background-color: var(--color-error);
  color: var(--color-on-error);
}
</style>
