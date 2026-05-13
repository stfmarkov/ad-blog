<template>
  <div class="admin-editor-page">
    <AdminEditorTopNav />
    <AdminSideNav active="articles" below-top-bar />

    <main class="admin-editor-page__main">
      <div class="admin-editor-page__inner">
        <SectionAdminEditorHeader />
        <SectionAdminEditorWorkspace />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

useHead({
  title: 'Create Article — AdventurousNerd Admin',
})
</script>

<style scoped>
.admin-editor-page {
  min-height: 100dvh;
}

.admin-editor-page__main {
  margin-left: var(--admin-sidebar-w);
  padding-top: var(--admin-top-bar-h);
  padding-bottom: var(--space-stack-lg);
  padding-inline: var(--space-margin-mobile);
}

@media (min-width: 768px) {
  .admin-editor-page__main {
    padding-inline: var(--space-margin-desktop);
  }
}

.admin-editor-page__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-top: var(--space-stack-lg);
}
</style>
