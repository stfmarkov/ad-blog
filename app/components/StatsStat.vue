<script setup lang="ts">
const props = defineProps<{
    value: string;
    label: string;
    index: number;
    total: number;
}>();
</script>

<template>
    <div class="stats__stat">
        <span class="stats__value">{{ value }}</span>
        <span class="stats__label">{{ label }}</span>
    </div>
    <div v-if="index < total - 1" class="stats__divider" aria-hidden="true" />
</template>

<style scoped>
.stats__stat {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stats__value {
    font-family: var(--font-display);
    font-size: var(--type-display-lg-mobile-size);
    font-weight: var(--type-display-lg-weight);
    line-height: 1;
    color: white;
}

.stats__label {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
}

.stats__divider {
    width: 1px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
}
</style>