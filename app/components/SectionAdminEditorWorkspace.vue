<script setup lang="ts">
type Cat = 'rides' | 'code' | 'quests'

const title = ref('')
const category = ref<Cat>('rides')
const body = ref('')
const tags = ref<Array<{ id: string; label: string; tone: 'rides' | 'code' }>>([
  { id: '1', label: 'ADVENTURE', tone: 'rides' },
  { id: '2', label: 'TYPESCRIPT', tone: 'code' },
])
const tagInput = ref('')
const publishDate = ref('2024-10-24')

function addTag() {
  const t = tagInput.value.trim().toUpperCase()
  if (!t) return
  tags.value.push({
    id: crypto.randomUUID(),
    label: t,
    tone: 'code',
  })
  tagInput.value = ''
}

function removeTag(id: string) {
  tags.value = tags.value.filter((x) => x.id !== id)
}
</script>

<template>
  <div class="admin-workspace">
    <div class="admin-workspace__main">
      <div class="admin-workspace__block neo-brutal-card">
        <label class="admin-workspace__label" for="admin-article-title">Article Title</label>
        <input
          id="admin-article-title"
          v-model="title"
          type="text"
          class="admin-workspace__title-input"
          placeholder="Enter a compelling title..."
          autocomplete="off"
        />
      </div>

      <div class="admin-workspace__cats">
        <button
          type="button"
          class="admin-workspace__cat neo-brutal-card"
          :class="{ 'admin-workspace__cat--on': category === 'rides' }"
          @click="category = 'rides'"
        >
          <span class="admin-workspace__cat-inner">
            <Icon :name="materialSymbolName('two-wheeler')" :size="24" class="admin-workspace__cat-icon-rides" />
            <span class="admin-workspace__cat-label">RIDES</span>
          </span>
          <Icon
            :name="materialSymbolName('check-circle')"
            :size="22"
            class="admin-workspace__cat-check"
            :class="{ 'admin-workspace__cat-check--on': category === 'rides' }"
          />
        </button>
        <button
          type="button"
          class="admin-workspace__cat neo-brutal-card"
          :class="{ 'admin-workspace__cat--on-code': category === 'code' }"
          @click="category = 'code'"
        >
          <span class="admin-workspace__cat-inner">
            <Icon :name="materialSymbolName('terminal')" :size="24" class="admin-workspace__cat-icon-code" />
            <span class="admin-workspace__cat-label">CODE</span>
          </span>
          <Icon
            :name="materialSymbolName('check-circle')"
            :size="22"
            class="admin-workspace__cat-check"
            :class="{ 'admin-workspace__cat-check--on': category === 'code' }"
          />
        </button>
        <button
          type="button"
          class="admin-workspace__cat neo-brutal-card"
          :class="{ 'admin-workspace__cat--on-quests': category === 'quests' }"
          @click="category = 'quests'"
        >
          <span class="admin-workspace__cat-inner">
            <Icon :name="materialSymbolName('explore')" :size="24" class="admin-workspace__cat-icon-quests" />
            <span class="admin-workspace__cat-label">QUESTS</span>
          </span>
          <Icon
            :name="materialSymbolName('check-circle')"
            :size="22"
            class="admin-workspace__cat-check"
            :class="{ 'admin-workspace__cat-check--on': category === 'quests' }"
          />
        </button>
      </div>

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
        <textarea
          v-model="body"
          class="admin-workspace__textarea"
          rows="14"
          placeholder="Once upon a time in the digital wilderniss..."
        />
      </div>
    </div>

    <aside class="admin-workspace__aside">
      <div class="admin-workspace__panel neo-brutal-card">
        <h3 class="admin-workspace__panel-title">
          <Icon :name="materialSymbolName('image')" :size="18" />
          Featured Image
        </h3>
        <div class="admin-workspace__drop">
          <Icon :name="materialSymbolName('cloud-upload')" :size="40" class="admin-workspace__drop-icon" />
          <p class="admin-workspace__drop-hint">Drag & drop or click</p>
          <img src="/images/bike.webp" alt="" class="admin-workspace__drop-preview" width="400" height="225" />
        </div>
      </div>

      <div class="admin-workspace__panel neo-brutal-card">
        <h3 class="admin-workspace__panel-title">
          <Icon :name="materialSymbolName('label')" :size="18" />
          Tags
        </h3>
        <div class="admin-workspace__tags">
          <span
            v-for="t in tags"
            :key="t.id"
            class="admin-workspace__tag"
            :class="t.tone === 'rides' ? 'admin-workspace__tag--rides' : 'admin-workspace__tag--code'"
          >
            {{ t.label }}
            <button type="button" class="admin-workspace__tag-x" @click="removeTag(t.id)">
              <Icon :name="materialSymbolName('close')" :size="14" />
            </button>
          </span>
        </div>
        <div class="admin-workspace__tag-row">
          <input
            v-model="tagInput"
            type="text"
            class="admin-workspace__tag-input"
            placeholder="Add a tag..."
            @keydown.enter.prevent="addTag"
          />
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
              <input
                id="admin-publish-date"
                v-model="publishDate"
                type="date"
                class="admin-workspace__date"
              />
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

      <div class="admin-workspace__danger">
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

.admin-workspace__cat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: var(--radius-md);
  text-align: left;
  cursor: pointer;
  color: var(--color-primary);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.admin-workspace__cat:hover {
  transform: translate(1px, 1px);
  box-shadow: var(--shadow-hard-hover);
}

.admin-workspace__cat--on {
  background-color: var(--color-rides);
  color: var(--color-on-primary);
}

.admin-workspace__cat--on .admin-workspace__cat-icon-rides {
  color: var(--color-on-primary);
}

.admin-workspace__cat--on-code {
  background-color: var(--color-code);
  color: var(--color-on-primary);
}

.admin-workspace__cat--on-code .admin-workspace__cat-icon-code {
  color: var(--color-on-primary);
}

.admin-workspace__cat--on-quests {
  background-color: var(--color-quests);
  color: var(--color-on-primary);
}

.admin-workspace__cat--on-quests .admin-workspace__cat-icon-quests {
  color: var(--color-on-primary);
}

.admin-workspace__cat-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-workspace__cat-icon-rides {
  color: var(--color-rides);
}

.admin-workspace__cat-icon-code {
  color: var(--color-code);
}

.admin-workspace__cat-icon-quests {
  color: var(--color-quests);
}

.admin-workspace__cat-label {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
}

.admin-workspace__cat-check {
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.admin-workspace__cat-check--on {
  opacity: 1;
}

.admin-workspace__cat:hover .admin-workspace__cat-check {
  opacity: 0.35;
}

.admin-workspace__cat--on .admin-workspace__cat-check,
.admin-workspace__cat--on-code .admin-workspace__cat-check,
.admin-workspace__cat--on-quests .admin-workspace__cat-check {
  opacity: 1;
}

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

.admin-workspace__aside {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}

.admin-workspace__panel {
  padding: var(--space-stack-md);
  border-radius: var(--radius-md);
}

.admin-workspace__panel-title {
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

.admin-workspace__drop {
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

.admin-workspace__drop:hover {
  background-color: rgba(237, 237, 244, 0.5);
}

.admin-workspace__drop-icon {
  color: var(--color-primary);
  opacity: 0.2;
  transition: transform var(--transition-fast);
}

.admin-workspace__drop:hover .admin-workspace__drop-icon {
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

.admin-workspace__drop-preview {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  transition: opacity var(--transition-fast);
}

.admin-workspace__drop:hover .admin-workspace__drop-preview {
  opacity: 0.35;
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

.admin-workspace__field-label {
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
