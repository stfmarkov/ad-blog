<template>
  <nav class="admin-editor-top" aria-label="Admin editor top">
    <div class="admin-editor-top__brand">AdventurousNerd Admin</div>
    <div class="admin-editor-top__right">
      <div class="admin-editor-top__links">
        <NuxtLink to="/admin" class="admin-editor-top__link admin-editor-top__link--active">
          Dashboard
        </NuxtLink>
        <NuxtLink to="/admin" class="admin-editor-top__link">Articles</NuxtLink>
        <a href="#" class="admin-editor-top__link">Media</a>
      </div>
      <div class="admin-editor-top__tools">
        <button type="button" class="admin-editor-top__icon-btn" aria-label="Notifications">
          <Icon :name="materialSymbolName('notifications')" :size="22" />
        </button>
        <button type="button" class="admin-editor-top__icon-btn" aria-label="Settings">
          <Icon :name="materialSymbolName('settings')" :size="22" />
        </button>
        <img src="/images/screen.webp" alt="" width="40" height="40" class="admin-editor-top__avatar" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.admin-editor-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-gutter);
  flex-wrap: wrap;
  padding: var(--space-stack-sm) var(--space-gutter);
  background-color: var(--color-surface-container);
  border-bottom: 2px solid var(--color-primary);
  min-height: var(--admin-top-bar-h);
}

.admin-editor-top__brand {
  font-family: var(--font-display);
  font-size: var(--type-headline-md-size);
  font-weight: var(--font-weight-bold);
  font-style: italic;
  color: var(--color-primary);
}

.admin-editor-top__right {
  display: flex;
  align-items: center;
  gap: var(--space-stack-md);
}

.admin-editor-top__links {
  display: none;
  align-items: center;
  gap: var(--space-stack-md);
}

@media (min-width: 768px) {
  .admin-editor-top__links {
    display: flex;
  }
}

.admin-editor-top__link {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--color-primary);
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.admin-editor-top__link:hover {
  background-color: rgba(255, 145, 77, 0.1);
  border-radius: var(--radius-sm);
}

.admin-editor-top__link.router-link-active,
.admin-editor-top__link--active {
  color: var(--color-rides);
  font-weight: 800;
  border-bottom-color: var(--color-rides);
}

.admin-editor-top__tools {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: var(--space-stack-md);
  border-left: 2px solid var(--color-primary);
}

.admin-editor-top__icon-btn {
  padding: 8px;
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  transition: background-color var(--transition-fast);
}

.admin-editor-top__icon-btn:hover {
  background-color: rgba(255, 145, 77, 0.1);
}

.admin-editor-top__avatar {
  border-radius: var(--radius-full);
  border: 2px solid var(--color-primary);
  object-fit: cover;
}
</style>
