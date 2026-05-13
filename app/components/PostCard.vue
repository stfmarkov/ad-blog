<script setup lang="ts">
defineProps<{
  id: number
  category: string
  categoryLabel: string
  title: string
  excerpt: string
  image: string
  imageAlt: string
}>()
</script>

<template>
  <article class="post-card">
    <div class="post-card__image-wrap">
      <img :src="image" :alt="imageAlt" class="post-card__image" />
      <span class="post-card__pill" :class="`post-card__pill--${category}`">
        {{ categoryLabel }}
      </span>
    </div>
    <h4 class="post-card__title">{{ title }}</h4>
    <p class="post-card__excerpt">{{ excerpt }}</p>
  </article>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
}

.post-card__image-wrap {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-outline-variant);
  margin-bottom: 16px;
  aspect-ratio: 16 / 9;
  background-color: var(--color-surface-container-high);
}

.post-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.post-card:hover .post-card__image {
  transform: scale(1.05);
}

.post-card__pill {
  position: absolute;
  top: 16px;
  left: 16px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.post-card__pill--quests { background-color: var(--color-primary); }
.post-card__pill--code   { background-color: var(--color-code); }
.post-card__pill--rides  { background-color: var(--color-rides); }

.post-card__title {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  line-height: var(--type-headline-sm-lh);
  margin-bottom: 8px;
  color: var(--color-on-surface);
  transition: color var(--transition-fast);
}

.post-card:hover .post-card__title {
  color: var(--color-primary);
}

.post-card__excerpt {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
