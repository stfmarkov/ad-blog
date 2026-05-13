<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Visual variant */
    variant?: 'primary' | 'surface'
    /**
     * Override the accent colour for category-specific pages.
     * Pass a CSS custom property reference (e.g. "var(--color-rides)")
     * or any valid CSS colour value.
     * - primary variant: used as background
     * - surface variant: used as text / border colour
     */
    color?: string
    /** Renders as <a> when supplied, otherwise <button> */
    href?: string
    /** Used with NuxtLink instead of <a> when set */
    to?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  }
)
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : href ? 'a' : 'button'"
    class="app-btn hard-shadow hard-shadow-hover"
    :class="`app-btn--${variant}`"
    :style="color ? (variant === 'primary'
      ? `--btn-bg: ${color}; --btn-text: var(--color-on-primary)`
      : `--btn-text: ${color}; --btn-border: ${color}`) : ''"
    :href="href"
    :to="to"
    :type="to || href ? undefined : type"
  >
    <slot />
  </component>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────────── */
.app-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  border: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

/* ── Primary ──────────────────────────────────────────────── */
.app-btn--primary {
  background-color: var(--btn-bg, var(--color-primary));
  color: var(--btn-text, var(--color-on-primary));
  padding: 1rem 2rem;
  border-radius: var(--radius-xl);
}

/* ── Surface ──────────────────────────────────────────────── */
.app-btn--surface {
  background-color: var(--color-surface-bright);
  color: var(--btn-text, var(--color-primary));
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--btn-border, var(--color-primary));
}

/* ── Hard-shadow interaction (also defined globally but
      scoped here so the component is self-contained) ──────── */
.hard-shadow       { box-shadow: var(--shadow-hard); }
.hard-shadow-hover:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-hard-hover);
}
</style>
