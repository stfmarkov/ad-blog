<script setup lang="ts">
withDefaults(
  defineProps<{
    active: 'dashboard' | 'articles' | 'categories' | 'media'
    /** Editor layout: dock below fixed top bar */
    belowTopBar?: boolean
  }>(),
  { belowTopBar: false },
)
</script>

<template>
  <aside
    class="admin-sidenav"
    :class="{ 'admin-sidenav--below-top': belowTopBar }"
    aria-label="Admin navigation"
  >
    <div class="admin-sidenav__brand">
      <div class="admin-sidenav__logo">
        <Icon :name="materialSymbolName('auto-stories')" class="admin-sidenav__logo-icon" :size="24" />
      </div>
      <div>
        <p class="admin-sidenav__title">Journal Admin</p>
        <p class="admin-sidenav__version">V3.0 Stable</p>
      </div>
    </div>

    <nav class="admin-sidenav__nav">
      <NuxtLink
        to="/admin"
        class="admin-sidenav__link"
        :class="{ 'admin-sidenav__link--active': active === 'dashboard' }"
      >
        <Icon :name="materialSymbolName('dashboard')" :size="22" />
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink
        to="/admin"
        class="admin-sidenav__link"
        :class="{ 'admin-sidenav__link--active': active === 'articles' }"
      >
        <Icon :name="materialSymbolName('description')" :size="22" />
        <span>Articles</span>
      </NuxtLink>
      <a href="#" class="admin-sidenav__link">
        <Icon :name="materialSymbolName('category')" :size="22" />
        <span>Categories</span>
      </a>
      <a href="#" class="admin-sidenav__link">
        <Icon :name="materialSymbolName('folder-open')" :size="22" />
        <span>Media</span>
      </a>
    </nav>

    <div class="admin-sidenav__footer">
      <NuxtLink to="/admin/editor" class="admin-sidenav__cta neo-brutal-btn">
        <Icon :name="materialSymbolName('edit')" :size="18" />
        Write New Post
      </NuxtLink>
      <a href="#" class="admin-sidenav__link admin-sidenav__link--quiet">
        <Icon :name="materialSymbolName('help-outline')" :size="22" />
        Support
      </a>
      <a href="#" class="admin-sidenav__link admin-sidenav__link--quiet">
        <Icon :name="materialSymbolName('logout')" :size="22" />
        Sign Out
      </a>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidenav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: var(--admin-sidebar-w);
  height: 100dvh;
  padding: var(--space-stack-md);
  background-color: var(--color-surface-container);
  border-right: 2px solid var(--color-primary);
}

.admin-sidenav--below-top {
  top: var(--admin-top-bar-h);
  height: calc(100dvh - var(--admin-top-bar-h));
}

.admin-sidenav__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--space-stack-lg);
}

.admin-sidenav__logo {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-rides);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-md);
}

.admin-sidenav__logo-icon {
  color: var(--color-on-primary);
}

.admin-sidenav__title {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  line-height: 1.2;
  color: var(--color-primary);
}

.admin-sidenav__version {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  opacity: 0.7;
  margin-top: 2px;
}

.admin-sidenav__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-sidenav__link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
  text-decoration: none;
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.admin-sidenav__link:hover {
  background-color: rgba(255, 255, 255, 0.35);
  transform: translate(-1px, -1px);
}

.admin-sidenav__link--active {
  background-color: var(--color-rides);
  color: var(--color-on-primary);
  border: 2px solid var(--color-primary);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-hard);
}

.admin-sidenav__link--active:hover {
  background-color: var(--color-rides);
  color: var(--color-on-primary);
}

.admin-sidenav__link--quiet {
  text-transform: none;
  font-weight: 600;
}

.admin-sidenav__footer {
  margin-top: auto;
  padding-top: var(--space-stack-md);
  border-top: 2px solid rgba(0, 100, 149, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-sidenav__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  text-decoration: none;
}

.admin-sidenav__cta.neo-brutal-btn:hover {
  color: var(--color-on-primary);
}
</style>
