<script setup lang="ts">
const hubs = [
  {
    title: 'Rides',
    description:
      'Dust, grease, and the open road. Following the wind across borders on two wheels.',
    link: '/rides',
    icon: 'motorcycle',
    tone: 'rides' as const,
    linkText: 'VIEW LOGS',
  },
  {
    title: 'Quests',
    description:
      'Crit hits, world-building, and session notes from the tabletop frontier.',
    link: '/quests',
    icon: 'casino',
    tone: 'quests' as const,
    linkText: 'ROLL INITIATIVE',
  },
  {
    title: 'Code',
    description:
      'Breaking things in React, python scripts for DMing, and AI experiments.',
    link: '/code',
    icon: 'terminal',
    tone: 'code' as const,
    linkText: 'EXECUTE',
  },
]
</script>

<template>
  <div class="hubs__grid">
    <IconCard
      v-for="hub in hubs"
      :key="hub.title"
      :title="hub.title"
      :description="hub.description"
      :icon="hub.icon"
      :tone="hub.tone"
      :to="hub.link"
      :link-text="hub.linkText"
    />
  </div>
</template>

<style scoped>
.hubs__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
}

@media (min-width: 768px) {
  .hubs__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
