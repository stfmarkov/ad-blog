<script setup lang="ts">
import StatsStat from './StatsStat.vue';

const stats = [
  { value: '12k', label: 'Miles Ridden' },
  { value: '87', label: 'Critical Hits' },
  { value: '1.2m', label: 'Lines Coded' },
]
</script>

<template>
  <div class="stats">
    <StatsStat v-for="(stat, i) in stats" :key="stat.label" :value="stat.value" :label="stat.label" :index="i"
      :total="stats.length" />
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>
