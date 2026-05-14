<script setup lang="ts">
const emit = defineEmits<{
  publish: []
}>()
</script>

<template>
  <div class="admin-editor-head">
    <div>
      <span class="admin-editor-head__eyebrow">Editor Mode</span>
      <h1 class="admin-editor-head__title">Create New Article</h1>
    </div>
    <div class="admin-editor-head__actions">
      <button type="button" class="admin-editor-head__btn admin-editor-head__btn--surface neo-brutal-btn">
        <Icon :name="materialSymbolName('visibility')" :size="18" />
        Preview
      </button>
      <button type="button" class="admin-editor-head__btn admin-editor-head__btn--publish neo-brutal-btn"
        @click="emit('publish')">
        <Icon :name="materialSymbolName('publish')" :size="18" />
        Publish Post
      </button>
    </div>
  </div>
</template>

<style scoped>
.admin-editor-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-stack-md);
  margin-bottom: var(--space-stack-lg);
}

@media (min-width: 768px) {
  .admin-editor-head {
    flex-direction: row;
    align-items: flex-end;
  }
}

.admin-editor-head__eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
  opacity: 0.6;
  margin-bottom: 8px;
}

.admin-editor-head__title {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  line-height: var(--type-display-lg-mobile-lh);
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .admin-editor-head__title {
    font-size: var(--type-display-lg-size);
    line-height: var(--type-display-lg-lh);
  }
}

.admin-editor-head__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-sm);
}

.admin-editor-head__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.admin-editor-head__btn--surface {
  background-color: var(--color-surface-container);
  color: var(--color-primary);
}

.admin-editor-head__btn--publish {
  background-color: var(--color-rides);
  color: var(--color-on-primary);
  padding-inline: 32px;
}

.admin-editor-head__btn--publish:hover {
  color: var(--color-on-primary);
}
</style>
