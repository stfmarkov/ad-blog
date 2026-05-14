<script setup lang="ts">

const props = defineProps<{
    color: 'rides' | 'code' | 'quests',
    active: boolean,
    label: string,
    icon: string
}>()

const emit = defineEmits<{
    (e: 'update:active', value: boolean): void
}>()


const handleClick = () => {
    emit('update:active', !props.active)
}

const toneOnClass = computed(() => {
    if (!props.active) return undefined
    if (props.color === 'rides') return 'cat-button--on'
    if (props.color === 'code') return 'cat-button--on-code'
    return 'cat-button--on-quests'
})

const iconToneClass = computed(() => {
    if (!props.active) return undefined
    return `cat-button-icon-${props.color}--on`
})

</script>

<template>
    <button type="button" class="cat-button neo-brutal-card" :class="toneOnClass" @click="handleClick">
        <span class="cat-button-inner">
            <Icon :name="materialSymbolName(icon)" :size="24" :class="iconToneClass" />
            <span class="cat-button-label">{{ label }}</span>
        </span>
        <Icon :name="materialSymbolName('check-circle')" :size="22" class="cat-button-check"
            :class="{ 'cat-button-check--on': active }" />
    </button>
</template>

<style scoped>
.cat-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: var(--radius-md);
    text-align: left;
    cursor: pointer;
    color: var(--color-primary);
    transition:
        background-color var(--transition-fast),
        color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
}

.cat-button--on {
    background-color: var(--color-rides);
    color: var(--color-on-primary);
}

.cat-button-icon-rides--on {
    color: var(--color-on-primary);
}

.cat-button--on-code {
    background-color: var(--color-code);
    color: var(--color-on-primary);
}

.cat-button-icon-code--on {
    color: var(--color-on-primary);
}

.cat-button--on-quests {
    background-color: var(--color-quests);
    color: var(--color-on-primary);
}

.cat-button-icon-quests--on {
    color: var(--color-on-primary);
}

.cat-button-inner {
    display: flex;
    align-items: center;
    gap: 12px;
}

.cat-button-icon-rides {
    color: var(--color-rides);
}

.cat-button-icon-code {
    color: var(--color-code);
}

.cat-button-icon-quests {
    color: var(--color-quests);
}

.cat-button-label {
    font-family: var(--font-mono);
    font-size: var(--type-label-caps-size);
    font-weight: var(--type-label-caps-weight);
    letter-spacing: var(--type-label-caps-spacing);
}

.cat-button-check {
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.cat-button-check--on {
    opacity: 1;
}

.cat-button:hover .cat-button-check {
    opacity: 0.35;
}

.cat-button--on .cat-button-check {
    opacity: 1;
}
</style>