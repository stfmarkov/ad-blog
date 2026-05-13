<template>
  <div class="admin-root">
    <slot />
  </div>
</template>

<style>
.admin-root {
  min-height: 100dvh;
  background-color: var(--color-surface-container);
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: var(--type-body-md-size);
  line-height: var(--line-height-relaxed);
}

.admin-root h1,
.admin-root h2,
.admin-root h3,
.admin-root h4 {
  font-family: var(--font-display);
  color: var(--color-primary);
}
</style>
