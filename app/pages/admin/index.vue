<template>
  <div class="admin-page">
    <AdminSideNav active="articles" />
    <div class="admin-page__main">
      <AdminListHeader />
      <div class="admin-page__canvas">
        <SectionAdminArchivesHeader />
        <SectionAdminArticleToolbar />
        <SectionAdminArticleTable />
        <SectionAdminListInsights />
      </div>
      <footer class="admin-page__footer">
        <p>AdventurousNerd Admin Portal • Est. 2024 • Built for the Bold</p>
      </footer>
    </div>

    <NuxtLink to="/admin/editor" class="admin-fab" aria-label="Write new post">
      <Icon :name="materialSymbolName('add')" :size="32" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

useHead({
  title: 'Articles — AdventurousNerd Admin',
})
</script>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100dvh;
}

.admin-page__main {
  flex: 1;
  margin-left: var(--admin-sidebar-w);
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.admin-page__canvas {
  flex: 1;
  padding: var(--space-gutter);
  max-width: var(--container-max);
  width: 100%;
  margin: 0 auto;
}

.admin-page__footer {
  margin-top: auto;
  padding: var(--space-stack-md);
  text-align: center;
  border-top: 2px solid rgba(0, 100, 149, 0.08);
  opacity: 0.45;
}

.admin-page__footer p {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
}

.admin-fab {
  position: fixed;
  bottom: var(--space-gutter);
  right: var(--space-gutter);
  z-index: 50;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--color-rides);
  color: var(--color-on-primary);
  border: 2px solid var(--color-primary);
  box-shadow: 6px 6px 0 0 rgba(0, 100, 149, 1);
  text-decoration: none;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.admin-fab:hover {
  color: var(--color-on-primary);
  transform: translate(1px, 1px);
  box-shadow: 4px 4px 0 0 rgba(0, 100, 149, 1);
}

.admin-fab:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 rgba(0, 100, 149, 1);
}
</style>
