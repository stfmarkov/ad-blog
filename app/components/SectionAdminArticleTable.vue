<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useArticleStore, type Category } from '~/store/article'

type CategorySlug = 'rides' | 'code' | 'quests'
type StatusSlug = 'published' | 'draft'

const CATEGORY_LABEL: Record<CategorySlug, string> = {
  rides: 'RIDES',
  code: 'CODE',
  quests: 'QUESTS',
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const isCategorySlug = (c: string): c is CategorySlug => {
  return c === 'rides' || c === 'code' || c === 'quests'
}

const normalizeCategory = (raw: Category | string): CategorySlug => {
  if (typeof raw === 'string' && isCategorySlug(raw)) return raw
  return 'quests'
}

const normalizeStatus = (raw: string): StatusSlug => {
  const v = (raw ?? '').toLowerCase()
  return v === 'published' ? 'published' : 'draft'
}

const placeholderThumb = (category: CategorySlug): string => {
  if (category === 'rides') return '/images/bike.webp'
  if (category === 'code') return '/images/screen.webp'
  return '/images/dice.webp'
}

const articleStore = useArticleStore()
const { articles } = storeToRefs(articleStore)

const rows = computed(() =>
  articles.value.map((a) => {
    const category = normalizeCategory(a.category)
    const image = typeof a.image === 'string' && a.image.trim() !== ''
      ? a.image
      : placeholderThumb(category)
    return {
      id: a.id,
      title: a.title || 'Untitled',
      category,
      categoryLabel: CATEGORY_LABEL[category],
      date: Number.isFinite(a.updatedAt?.getTime?.())
        ? dateFormatter.format(a.updatedAt)
        : '',
      status: normalizeStatus(a.status),
      thumb: image,
      thumbAlt: `${a.title || 'Article'} thumbnail`,
    }
  }),
)

const totalCount = computed(() => articles.value.length)

const deletingId = ref<string | null>(null)

const onDelete = async (row: { id: string; title: string }) => {
  const ok = window.confirm(`Delete “${row.title}”? This cannot be undone.`)
  if (!ok) return
  deletingId.value = row.id
  try {
    await articleStore.deleteArticle(row.id)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Failed to delete article'
    window.alert(msg)
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="admin-table-wrap neo-brutal-card">
    <div class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Article Title</th>
            <th>Category</th>
            <th>Last Modified</th>
            <th>Status</th>
            <th class="admin-table__th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="5" class="admin-table__empty">
              No articles yet — create one from the floating action button.
            </td>
          </tr>
          <tr v-for="row in rows" :key="row.id">
            <td>
              <div class="admin-table__title-cell">
                <div class="admin-table__thumb">
                  <img :src="row.thumb" :alt="row.thumbAlt" width="48" height="48" />
                </div>
                <span class="admin-table__title-text">{{ row.title }}</span>
              </div>
            </td>
            <td>
              <span class="admin-table__cat" :class="`admin-table__cat--${row.category}`">
                {{ row.categoryLabel }}
              </span>
            </td>
            <td class="admin-table__muted">{{ row.date }}</td>
            <td>
              <div class="admin-table__status">
                <span class="admin-table__dot" :class="row.status === 'published'
                    ? 'admin-table__dot--green'
                    : 'admin-table__dot--yellow'
                  " aria-hidden="true" />
                <span class="admin-table__status-label">{{ row.status.toUpperCase() }}</span>
              </div>
            </td>
            <td>
              <div class="admin-table__actions">
                <NuxtLink :to="`/admin/editor?id=${row.id}`" class="admin-table__action" aria-label="Edit">
                  <Icon :name="materialSymbolName('edit')" :size="18" />
                </NuxtLink>
                <button type="button" class="admin-table__action" aria-label="Preview">
                  <Icon :name="materialSymbolName('visibility')" :size="18" />
                </button>
                <button type="button" class="admin-table__action admin-table__action--danger"
                  :aria-label="`Delete ${row.title}`" :disabled="deletingId === row.id" @click="onDelete(row)">
                  <Icon :name="materialSymbolName('delete')" :size="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="admin-table__footer">
      <span class="admin-table__foot-note">{{ totalCount }} {{ totalCount === 1 ? 'entry' : 'entries' }}</span>
      <div class="admin-table__pager">
        <button type="button" class="admin-table__page neo-brutal-btn" aria-label="Previous page">
          <Icon :name="materialSymbolName('chevron-left')" />
        </button>
        <button type="button" class="admin-table__page admin-table__page--current neo-brutal-btn">1</button>
        <button type="button" class="admin-table__page neo-brutal-btn">2</button>
        <button type="button" class="admin-table__page neo-brutal-btn">3</button>
        <button type="button" class="admin-table__page neo-brutal-btn" aria-label="Next page">
          <Icon :name="materialSymbolName('chevron-right')" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-table-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  padding: 0;
}

.admin-table-scroll {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-size: var(--type-body-md-size);
}

.admin-table thead tr {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  border-bottom: 2px solid var(--color-primary);
}

.admin-table th {
  padding: var(--space-stack-md);
}

.admin-table__th-actions {
  text-align: center;
}

.admin-table tbody tr {
  border-bottom: 2px solid var(--color-surface-container);
  transition: background-color var(--transition-fast);
}

.admin-table tbody tr:hover {
  background-color: rgba(237, 237, 244, 0.35);
}

.admin-table td {
  padding: var(--space-stack-md);
  vertical-align: middle;
  color: var(--color-primary);
}

.admin-table__empty {
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  opacity: 0.65;
  padding: var(--space-stack-md) var(--space-gutter);
}

.admin-table__title-cell {
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 700;
}

.admin-table__thumb {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background-color: var(--color-surface-container);
}

.admin-table__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-table__title-text {
  min-width: 12rem;
}

.admin-table__cat {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
}

.admin-table__cat--rides {
  background-color: rgba(255, 145, 77, 0.2);
  color: var(--color-rides);
  border: 1px solid rgba(255, 145, 77, 0.4);
}

.admin-table__cat--code {
  background-color: rgba(0, 191, 255, 0.15);
  color: var(--color-code);
  border: 1px solid rgba(0, 191, 255, 0.4);
}

.admin-table__cat--quests {
  background-color: rgba(103, 80, 164, 0.2);
  color: var(--color-quests);
  border: 1px solid rgba(103, 80, 164, 0.4);
}

.admin-table__muted {
  color: var(--color-primary);
  opacity: 0.6;
}

.admin-table__status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-table__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.admin-table__dot--green {
  background-color: #22c55e;
}

.admin-table__dot--yellow {
  background-color: #eab308;
}

.admin-table__status-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.admin-table__actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.admin-table__action {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  text-decoration: none;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.admin-table__action:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.admin-table__action:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.admin-table__action--danger {
  border-color: var(--color-error);
  color: var(--color-error);
}

.admin-table__action--danger:hover:not(:disabled) {
  background-color: var(--color-error);
  color: var(--color-on-error);
}

.admin-table__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-stack-md);
  padding: var(--space-stack-md);
  border-top: 2px solid rgba(0, 100, 149, 0.1);
}

.admin-table__foot-note {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-primary);
  opacity: 0.6;
}

.admin-table__pager {
  display: flex;
  gap: 8px;
}

.admin-table__page {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-container-lowest);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: 700;
  color: var(--color-primary);
}

.admin-table__page--current {
  background-color: var(--color-rides);
  color: var(--color-on-primary);
}
</style>
