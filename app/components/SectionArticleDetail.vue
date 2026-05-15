<script setup lang="ts">
import type { Article, Category } from '~/store/article'

const props = defineProps<{
  article: Article
  related: Article[]
  prevArticle: Article | null
  nextArticle: Article | null
}>()

const newsletterEmail = ref('')
const newsletterOk = ref(false)

const categoryLabel = (c: Category): string => {
  if (c === 'rides') return 'Rides'
  if (c === 'code') return 'Code'
  return 'Quests'
}

const categoryAccentVar = (c: Category): string => {
  if (c === 'rides') return 'var(--color-rides)'
  if (c === 'code') return 'var(--color-code)'
  return 'var(--color-quests)'
}

const formatPub = (d: Date): string => {
  if (!d || Number.isNaN(d.getTime())) return ''
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

const readingMinutes = (text: string): number => {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const journalNumber = (id: string): number => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return 100 + (h % 900)
}

const progressPercent = (a: Article): number => {
  const words = a.content.trim().split(/\s+/).filter(Boolean).length
  const pct = Math.min(98, Math.max(12, Math.round((words / 800) * 100)))
  return pct
}

const bodyParagraphs = computed(() => {
  const raw = props.article.content?.trim() ?? ''
  if (!raw) return []
  return raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
})

const handleNewsletter = () => {
  if (!newsletterEmail.value.trim()) return
  newsletterOk.value = true
  newsletterEmail.value = ''
}

const tagAccent = (c: Category): string => {
  if (c === 'rides') return 'var(--color-rides)'
  if (c === 'code') return 'var(--color-code)'
  return 'var(--color-quests)'
}
</script>

<template>
  <div class="article-page">
    <header class="article-page__hero">
      <div class="article-page__hero-main">
        <div class="article-page__pills">
          <span
            class="article-page__pill article-page__pill--category"
            :class="`article-page__pill--${article.category}`"
          >
            {{ categoryLabel(article.category) }}
          </span>
          <span
            v-for="tag in article.tags.slice(0, 1)"
            :key="tag"
            class="article-page__pill article-page__pill--tag"
          >
            {{ tag }}
          </span>
        </div>

        <h1 class="article-page__title">{{ article.title }}</h1>

        <div
          class="article-page__meta"
          :style="{ '--article-accent': categoryAccentVar(article.category) }"
        >
          <div class="article-page__meta-item">
            <Icon name="material-symbols:calendar-today" class="article-page__meta-icon" aria-hidden="true" />
            <span>{{ formatPub(article.publishDate) }}</span>
          </div>
          <div class="article-page__meta-item">
            <Icon name="material-symbols:schedule" class="article-page__meta-icon" aria-hidden="true" />
            <span>{{ readingMinutes(article.content) }} min read</span>
          </div>
        </div>
      </div>

      <aside class="article-page__journal hard-shadow" aria-label="Journal status">
        <p class="article-page__journal-label">Journal entry #{{ journalNumber(article.id) }}</p>
        <div class="ink-progress ink-progress--article">
          <span class="ink-progress__fill" :style="{ width: progressPercent(article) + '%' }" />
        </div>
        <p class="article-page__journal-quote">
          The trail teaches what documentation never will — ship the trip, iterate in the field.
        </p>
      </aside>
    </header>

    <figure v-if="article.image" class="article-page__figure hard-shadow">
      <NuxtImg
        :src="article.image"
        :alt="article.title"
        class="article-page__cover"
        width="1120"
        height="600"
        sizes="100vw"
        loading="eager"
      />
    </figure>

    <div class="article-page__columns">
      <article class="article-page__body">
        <template v-if="bodyParagraphs.length">
          <p
            v-for="(para, i) in bodyParagraphs"
            :key="i"
            class="article-page__para"
            :class="{ 'article-page__para--lead': i === 0 }"
          >
            {{ para }}
          </p>
        </template>
        <p v-else class="article-page__para article-page__para--lead article-page__para--empty">
          This log entry has no body yet.
        </p>
      </article>

      <aside class="article-page__aside">
        <div class="article-page__cta hard-shadow">
          <span
            class="article-page__cta-eyebrow"
            :style="{ color: categoryAccentVar(article.category) }"
          >
            Sync with the hub
          </span>
          <h2 class="article-page__cta-title">Join the party</h2>
          <p class="article-page__cta-copy">
            Get bi-weekly updates on road trips, code snippets, and nerdy gear reviews.
          </p>
          <form class="article-page__cta-form" @submit.prevent="handleNewsletter">
            <label class="visually-hidden" for="article-newsletter-email">Email</label>
            <input
              id="article-newsletter-email"
              v-model="newsletterEmail"
              type="email"
              class="article-page__cta-input"
              placeholder="USER@DOMAIN.COM"
              autocomplete="email"
              required
            />
            <button type="submit" class="article-page__cta-btn hard-shadow hard-shadow-hover">
              Initialize subscription
            </button>
          </form>
          <p v-if="newsletterOk" class="article-page__cta-success">You are in. Check your inbox.</p>
        </div>

        <div v-if="related.length" class="article-page__related">
          <h3 class="article-page__related-heading">Similar quests</h3>
          <NuxtLink
            v-for="r in related"
            :key="r.id"
            :to="`/articles/${r.id}`"
            class="article-page__related-card"
          >
            <div class="article-page__related-thumb">
              <NuxtImg
                v-if="r.image"
                :src="r.image"
                :alt="r.title"
                width="80"
                height="80"
                class="article-page__related-img"
              />
            </div>
            <div class="article-page__related-text">
              <span
                class="article-page__related-cat"
                :style="{ color: tagAccent(r.category) }"
              >
                {{ categoryLabel(r.category).toUpperCase() }}
              </span>
              <span class="article-page__related-title">{{ r.title }}</span>
            </div>
          </NuxtLink>
        </div>

        <div v-if="article.tags.length" class="article-page__tags">
          <div class="article-page__tag-list">
            <span
              v-for="t in article.tags"
              :key="t"
              class="article-page__tag"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </aside>
    </div>

    <nav v-if="prevArticle || nextArticle" class="article-page__nav" aria-label="Adjacent posts">
      <NuxtLink
        v-if="prevArticle"
        :to="`/articles/${prevArticle.id}`"
        class="article-page__nav-link article-page__nav-link--prev"
      >
        <Icon name="material-symbols:arrow-back" class="article-page__nav-icon" aria-hidden="true" />
        <div>
          <span class="article-page__nav-label">Previous</span>
          <span class="article-page__nav-title">{{ prevArticle.title }}</span>
        </div>
      </NuxtLink>
      <span v-else class="article-page__nav-spacer" />

      <NuxtLink
        v-if="nextArticle"
        :to="`/articles/${nextArticle.id}`"
        class="article-page__nav-link article-page__nav-link--next"
      >
        <div>
          <span class="article-page__nav-label">Next</span>
          <span class="article-page__nav-title">{{ nextArticle.title }}</span>
        </div>
        <Icon name="material-symbols:arrow-forward" class="article-page__nav-icon" aria-hidden="true" />
      </NuxtLink>
    </nav>
  </div>
</template>

<style scoped>
.article-page {
  padding-block: var(--space-stack-lg);
}

.article-page__hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-gutter);
  margin-bottom: var(--space-stack-lg);
}

@media (min-width: 768px) {
  .article-page__hero {
    flex-direction: row;
    align-items: flex-start;
  }
}

.article-page__hero-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}

.article-page__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-page__pill {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-on-primary);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.article-page__pill--rides {
  background-color: var(--color-rides);
}

.article-page__pill--code {
  background-color: var(--color-code);
}

.article-page__pill--quests {
  background-color: var(--color-quests);
}

.article-page__pill--tag {
  background-color: var(--color-quests);
}

.article-page__title {
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  line-height: var(--type-display-lg-mobile-lh);
  letter-spacing: -0.03em;
  color: var(--color-on-surface);
}

@media (min-width: 768px) {
  .article-page__title {
    font-size: var(--type-display-lg-size);
    line-height: var(--type-display-lg-lh);
  }
}

.article-page__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-md);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-outline-variant);
}

.article-page__meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.article-page__meta-icon {
  color: var(--article-accent, var(--color-primary));
  flex-shrink: 0;
}

.article-page__journal {
  width: 100%;
  background: var(--color-surface-container);
  border: 2px solid var(--color-outline-variant);
  padding: var(--space-stack-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-stack-sm);
  text-align: center;
}

@media (min-width: 768px) {
  .article-page__journal {
    width: 33%;
    min-width: 240px;
  }
}

.article-page__journal-label {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-quests);
}

.ink-progress--article {
  margin-inline: var(--space-stack-sm);
}

.ink-progress--article::after {
  display: none;
}

.ink-progress__fill {
  display: block;
  height: 100%;
  background: var(--color-quests);
  border-radius: 999px;
}

.article-page__journal-quote {
  font-size: var(--type-body-md-size);
  font-style: italic;
  color: var(--color-on-surface-variant);
  line-height: var(--line-height-relaxed);
  padding-inline: var(--space-stack-sm);
}

.article-page__figure {
  margin: 0 0 var(--space-stack-lg);
  border: 2px solid var(--color-on-surface);
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.article-page__cover {
  width: 100%;
  height: min(60vw, 600px);
  min-height: 240px;
  object-fit: cover;
}

.article-page__columns {
  display: flex;
  flex-direction: column;
  gap: var(--space-gutter);
}

@media (min-width: 1024px) {
  .article-page__columns {
    flex-direction: row;
    align-items: flex-start;
  }
}

.article-page__body {
  flex: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}

@media (min-width: 1024px) {
  .article-page__body {
    max-width: 720px;
  }
}

.article-page__para {
  font-size: var(--type-body-md-size);
  line-height: var(--type-body-md-lh);
  color: var(--color-on-surface-variant);
}

.article-page__para--lead {
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-on-surface);
}

.article-page__para--empty {
  font-style: italic;
}

.article-page__aside {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-lg);
}

@media (min-width: 1024px) {
  .article-page__aside {
    width: 320px;
    flex-shrink: 0;
  }
}

.article-page__cta {
  background: var(--color-surface-container);
  border: 2px solid var(--color-on-surface);
  padding: var(--space-stack-md);
}

.article-page__cta-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.article-page__cta-title {
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  margin-bottom: var(--space-stack-sm);
}

.article-page__cta-copy {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
  margin-bottom: var(--space-stack-md);
}

.article-page__cta-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.article-page__cta-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--color-outline-variant);
  background: var(--color-surface-bright);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-on-surface);
}

.article-page__cta-input::placeholder {
  color: var(--color-outline-variant);
}

.article-page__cta-input:focus {
  outline: none;
  border-color: var(--color-quests);
}

.article-page__cta-btn {
  width: 100%;
  padding: 1rem;
  background: var(--color-quests);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.article-page__cta-success {
  margin-top: var(--space-stack-sm);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  color: var(--color-primary);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.article-page__related-heading {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  border-bottom: 2px solid var(--color-outline-variant);
  padding-bottom: var(--space-stack-sm);
  margin-bottom: var(--space-stack-sm);
}

.article-page__related-card {
  display: block;
  padding: 8px;
  border: 2px solid transparent;
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition:
    border-color var(--transition-fast),
    background-color var(--transition-fast);
}

.article-page__related-card:hover {
  border-color: var(--color-outline-variant);
  background: var(--color-surface-container-low);
}

.article-page__related-card + .article-page__related-card {
  margin-top: 8px;
}

.article-page__related-card {
  display: flex;
  gap: var(--space-stack-sm);
  align-items: center;
}

.article-page__related-thumb {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid var(--color-on-surface);
  background: var(--color-surface-container-high);
}

.article-page__related-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-page__related-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.article-page__related-cat {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.article-page__related-title {
  font-weight: 700;
  color: var(--color-on-surface);
  transition: color var(--transition-fast);
}

.article-page__related-card:hover .article-page__related-title {
  color: var(--color-quests);
}

.article-page__tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.article-page__tag {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: var(--color-surface-container);
  border: 1px solid var(--color-outline-variant);
  color: var(--color-on-surface-variant);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
  cursor: default;
}

.article-page__tag:hover {
  background: var(--color-rides);
  color: var(--color-on-primary);
  border-color: var(--color-rides);
}

.article-page__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-gutter);
  margin-top: var(--space-stack-lg);
  padding-top: var(--space-stack-lg);
  border-top: 2px solid var(--color-outline-variant);
}

.article-page__nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-stack-sm);
  text-decoration: none;
  color: inherit;
  max-width: 45%;
}

.article-page__nav-link--next {
  text-align: right;
  flex-direction: row;
  margin-left: auto;
}

.article-page__nav-spacer {
  flex: 1;
}

.article-page__nav-icon {
  color: var(--color-rides);
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.article-page__nav-link--prev:hover .article-page__nav-icon {
  transform: translateX(-8px);
}

.article-page__nav-link--next:hover .article-page__nav-icon {
  transform: translateX(8px);
}

.article-page__nav-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-outline-variant);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.article-page__nav-title {
  font-weight: 700;
  color: var(--color-on-surface);
  transition: color var(--transition-fast);
}

.article-page__nav-link:hover .article-page__nav-title {
  color: var(--color-quests);
}

.hard-shadow {
  box-shadow: var(--shadow-hard);
}

.hard-shadow-hover {
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.hard-shadow-hover:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-hard-hover);
}
</style>
