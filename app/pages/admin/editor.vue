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

import { useArticleStore } from '~/store/article'

definePageMeta({ layout: 'admin' })

useHead({
  title: 'Create Article — AdventurousNerd Admin',
})

const route = useRoute()
const articleId = route.query.id as string

const articleStore = useArticleStore()

onMounted(() => {
  if (articleId) {
    const article = articleStore.fetchArticle(articleId)
    if (article) {
      console.log(article)
    }
  } else {
    console.log('New article')
  }
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
