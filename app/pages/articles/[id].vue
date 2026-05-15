<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Article } from '~/store/article'
import { useArticleStore } from '~/store/article'

const route = useRoute()
const articleStore = useArticleStore()
const { article, articles } = storeToRefs(articleStore)

const id = computed(() => String(route.params.id ?? ''))

async function load() {
  try {
    await articleStore.fetchArticles()
  } catch {
    /* Listing is optional; prev/next may be empty. */
  }
  await articleStore.fetchArticle(id.value)
  if (!article.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }
}

await load()

watch(id, () => load())

function byPublishDate(a: Article, b: Article): number {
  return a.publishDate.getTime() - b.publishDate.getTime()
}

const prevArticle = computed(() => {
  const cur = article.value
  if (!cur) return null
  const ordered = [...articles.value].sort(byPublishDate)
  const idx = ordered.findIndex((a) => a.id === cur.id)
  if (idx <= 0) return null
  return ordered[idx - 1] ?? null
})

const nextArticle = computed(() => {
  const cur = article.value
  if (!cur) return null
  const ordered = [...articles.value].sort(byPublishDate)
  const idx = ordered.findIndex((a) => a.id === cur.id)
  if (idx < 0 || idx >= ordered.length - 1) return null
  return ordered[idx + 1] ?? null
})

const related = computed(() => {
  const cur = article.value
  if (!cur) return []
  return articles.value
    .filter((a) => a.id !== cur.id && a.category === cur.category)
    .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime())
    .slice(0, 3)
})

watchEffect(() => {
  const a = article.value
  if (!a) return
  const desc = a.content.replace(/\s+/g, ' ').trim().slice(0, 160)
  useHead({
    title: `${a.title} | AdventurousNerd`,
    meta: [{ name: 'description', content: desc || a.title }],
  })
})
</script>

<template>
  <div v-if="article" class="container">
    <SectionArticleDetail
      :article="article"
      :related="related"
      :prev-article="prevArticle"
      :next-article="nextArticle"
    />
  </div>
</template>
