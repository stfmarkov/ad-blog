<template>
  <SectionSplitHero />
  <SectionHubs />
  <SectionFeatured />
  <SectionRecent />
  <SectionNewsletter />
</template>

<script setup lang="ts">
useHead({
  title: 'AdventurousNerd — Digital Craftsman by Day, Dungeon Crawler by Night',
  meta: [
    {
      name: 'description',
      content: 'Motorcycle logs, homebrew TTRPG mechanics, and deep dives into AI & code.',
    },
  ],
})
</script>
