<script setup lang="ts">
const filter = ref<'all' | 'drafts' | 'scheduled'>('all')
const category = ref('all')
</script>

<template>
  <div class="admin-toolbar neo-brutal-card">
    <div class="admin-toolbar__filters">
      <button
        type="button"
        class="admin-toolbar__pill"
        :class="{ 'admin-toolbar__pill--active': filter === 'all' }"
        @click="filter = 'all'"
      >
        All Posts
      </button>
      <button
        type="button"
        class="admin-toolbar__pill"
        :class="{ 'admin-toolbar__pill--ghost': filter !== 'drafts' }"
        @click="filter = 'drafts'"
      >
        Drafts
      </button>
      <button
        type="button"
        class="admin-toolbar__pill"
        :class="{ 'admin-toolbar__pill--ghost': filter !== 'scheduled' }"
        @click="filter = 'scheduled'"
      >
        Scheduled
      </button>
    </div>

    <div class="admin-toolbar__right">
      <select v-model="category" class="admin-toolbar__select" aria-label="Category filter">
        <option value="all">Category: All</option>
        <option value="rides">Rides</option>
        <option value="quests">Quests</option>
        <option value="code">Code</option>
      </select>
      <button type="button" class="admin-toolbar__filter-btn neo-brutal-btn" aria-label="More filters">
        <Icon :name="materialSymbolName('filter-list')" :size="22" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.admin-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gutter);
  margin-bottom: var(--space-stack-md);
  padding: var(--space-stack-sm);
  border-radius: var(--radius-md);
}

.admin-toolbar__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.admin-toolbar__pill {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  color: var(--color-primary);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.admin-toolbar__pill--active {
  background-color: rgba(255, 145, 77, 0.1);
  border-color: var(--color-rides);
  color: var(--color-rides);
}

.admin-toolbar__pill--ghost:hover {
  background-color: var(--color-surface-container-high);
}

.admin-toolbar__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-toolbar__select {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  padding: 8px 16px;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-container);
  color: var(--color-primary);
  cursor: pointer;
}

.admin-toolbar__filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface-container-lowest);
  color: var(--color-primary);
}
</style>
