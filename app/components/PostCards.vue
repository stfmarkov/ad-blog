<script setup lang="ts">
const posts = [
  {
    id: 1,
    category: 'quests',
    categoryLabel: 'QUESTS',
    title: "Session 42: The Lich King's Wi-Fi",
    excerpt: 'How we accidentally introduced modern networking concepts into our high-fantasy D&D campaign.',
    image: '/images/dice.webp',
    imageAlt: 'Colorful polyhedral dice on a parchment fantasy map',
  },
  {
    id: 2,
    category: 'code',
    categoryLabel: 'CODE',
    title: 'Fine-Tuning GPT for Lore',
    excerpt: 'Automating the creation of redundant village NPCs using local LLMs and a custom schema.',
    image: '/images/screen.webp',
    imageAlt: 'Laptop screen with lines of JavaScript code',
  },
  {
    id: 3,
    category: 'rides',
    categoryLabel: 'RIDES',
    title: 'Packing Light for 10 Days',
    excerpt: 'The ultimate minimalist pack list for dual-sport adventuring in the backcountry.',
    image: '/images/bike.webp',
    imageAlt: 'Close-up of a classic motorcycle engine and gas tank',
  },
]
</script>

<template>
  <div class="post-grid">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      v-bind="post"
    />
  </div>
</template>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
}

@media (min-width: 768px) {
  .post-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .post-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
