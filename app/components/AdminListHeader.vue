<script setup lang="ts">
const q = ref('')
</script>

<template>
  <header class="admin-list-header">
    <h2 class="admin-list-header__title">AdventurousNerd Admin</h2>
    <div class="admin-list-header__right">
      <div class="admin-list-header__search">
        <input
          v-model="q"
          type="search"
          class="admin-list-header__input"
          placeholder="Search entries..."
          aria-label="Search entries"
        />
        <Icon :name="materialSymbolName('search')" class="admin-list-header__search-icon" :size="22" />
      </div>
      <div class="admin-list-header__actions">
        <button type="button" class="admin-list-header__icon-btn" aria-label="Notifications">
          <Icon :name="materialSymbolName('notifications')" :size="22" />
        </button>
        <button type="button" class="admin-list-header__icon-btn" aria-label="Settings">
          <Icon :name="materialSymbolName('settings')" :size="22" />
        </button>
        <div class="admin-list-header__avatar-wrap">
          <img src="/images/screen.webp" alt="" width="40" height="40" class="admin-list-header__avatar" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-list-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gutter);
  flex-wrap: wrap;
  padding: var(--space-stack-sm) var(--space-gutter);
  width: 100%;
  background-color: var(--color-surface-container);
  border-bottom: 2px solid var(--color-primary);
}

.admin-list-header__title {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

.admin-list-header__right {
  display: flex;
  align-items: center;
  gap: var(--space-stack-md);
}

.admin-list-header__search {
  position: relative;
  display: none;
}

@media (min-width: 1024px) {
  .admin-list-header__search {
    display: block;
  }
}

.admin-list-header__input {
  width: 16rem;
  padding: 8px 40px 8px 16px;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-container-lowest);
  color: var(--color-on-surface);
  font-size: var(--type-body-md-size);
}

.admin-list-header__input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-inverse-primary);
}

.admin-list-header__search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary);
  opacity: 0.5;
  pointer-events: none;
}

.admin-list-header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-list-header__icon-btn {
  padding: 8px;
  border-radius: var(--radius-full);
  color: var(--color-primary);
  transition: background-color var(--transition-fast);
}

.admin-list-header__icon-btn:hover {
  background-color: rgba(255, 145, 77, 0.1);
}

.admin-list-header__avatar-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-primary);
  overflow: hidden;
}

.admin-list-header__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
