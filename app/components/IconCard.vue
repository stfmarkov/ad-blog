<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Material Symbols glyph name (`motorcycle`) or full Iconify id (`material-symbols:memory`) */
    icon: string
    /** Icon tile palette */
    tone: 'rides' | 'quests' | 'code' | 'teal' | 'blue' | 'tertiary'
    title: string
    description: string
    /** Hub home cards vs code bento cards */
    variant?: 'hub' | 'bento'
    /** When set with `linkText`, renders the CTA row (hub style) */
    to?: string
    linkText?: string
  }>(),
  { variant: 'hub' },
)

const iconName = computed(() => materialSymbolName(props.icon))
</script>

<template>
  <component
    :is="variant === 'bento' ? 'article' : 'div'"
    class="icon-card"
    :class="`icon-card--${variant}`"
  >
    <div class="icon-card__icon" :class="`icon-card__icon--${tone}`">
      <Icon :name="iconName" :size="24" />
    </div>

    <h3 v-if="variant === 'hub'" class="icon-card__title icon-card__title--hub">
      {{ title }}
    </h3>
    <h4 v-else class="icon-card__title icon-card__title--bento">
      {{ title }}
    </h4>

    <p class="icon-card__desc">{{ description }}</p>

    <NuxtLink
      v-if="to && linkText"
      :to="to"
      class="icon-card__link"
      :class="`icon-card__link--${tone}`"
    >
      {{ linkText }}
      <Icon name="material-symbols:trending-flat" class="icon-card__arrow" :size="16" />
    </NuxtLink>
  </component>
</template>

<style scoped>
/* ── Shell ───────────────────────────────────── */
.icon-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: var(--space-stack-md);
  background-color: var(--color-surface-container-low);
  border-radius: var(--radius-xl);
}

.icon-card--hub {
  border: 1px solid var(--color-outline-variant);
  gap: 16px;
  transition: background-color var(--transition-fast);
}

.icon-card--hub:hover {
  background-color: var(--color-surface-container);
}

.icon-card--bento {
  border: 2px solid var(--color-outline-variant);
  transition: box-shadow var(--transition-fast);
}

.icon-card--bento:hover {
  box-shadow: var(--shadow-hard-sm);
}

/* ── Icon tile ─────────────────────────────────── */
.icon-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
}

.icon-card--hub .icon-card__icon {
  border-radius: var(--radius-lg);
}

/* Hub hub tones */
.icon-card__icon--rides {
  background: var(--color-rides-bg);
  color: var(--color-rides-text);
  border: 1px solid var(--color-rides-border);
}

.icon-card__icon--quests {
  background: rgba(0, 100, 149, 0.10);
  color: var(--color-primary);
  border: 1px solid rgba(0, 100, 149, 0.20);
}

.icon-card__icon--code {
  background: var(--color-code-bg);
  color: var(--color-code-text);
  border: 1px solid var(--color-code-border);
}

/* Bento / code page tones */
.icon-card__icon--teal {
  background-color: rgba(0, 245, 212, 0.20);
  color: var(--color-primary);
  border: none;
}

.icon-card__icon--blue {
  background-color: rgba(0, 180, 216, 0.20);
  color: var(--color-primary);
  border: none;
}

.icon-card__icon--tertiary {
  background-color: rgba(118, 91, 0, 0.12);
  color: var(--color-primary);
  border: none;
}

/* ── Typography ────────────────────────────────── */
.icon-card__title {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
}

.icon-card__title--hub {
  color: var(--color-on-surface);
}

.icon-card__title--bento {
  color: var(--color-primary);
}

.icon-card__desc {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
  flex: 1;
}

/* ── CTA (hub only in practice) ────────────────── */
.icon-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  text-decoration: none;
  transition: gap var(--transition-fast);
}

.icon-card--hub:hover .icon-card__link {
  gap: 12px;
}

.icon-card__link--rides {
  color: var(--color-rides-text);
}

.icon-card__link--quests {
  color: var(--color-primary);
}

.icon-card__link--code {
  color: var(--color-code-text);
}

.icon-card__link--teal,
.icon-card__link--blue,
.icon-card__link--tertiary {
  color: var(--color-primary);
}

.icon-card__arrow {
  flex-shrink: 0;
}
</style>
