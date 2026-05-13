<template>
  <div class="admin-archives">
    <div class="admin-archives__row">
      <div>
        <h3 class="admin-archives__title">Master Archives</h3>
        <p class="admin-archives__sub">
          Manage your journey logs, quest guides, and technical scrolls.
        </p>
      </div>

      <div class="admin-archives__stats">
        <div class="admin-archives__stat neo-brutal-card">
          <span class="admin-archives__stat-label">Total Articles</span>
          <span class="admin-archives__stat-value">124</span>
        </div>
        <div class="admin-archives__stat neo-brutal-card">
          <span class="admin-archives__stat-label">Published</span>
          <span class="admin-archives__stat-value admin-archives__stat-value--rides">98</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-archives__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-stack-md);
  margin-bottom: var(--space-stack-lg);
}

.admin-archives__title {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  font-style: italic;
  line-height: var(--type-display-lg-mobile-lh);
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .admin-archives__title {
    font-size: var(--type-display-lg-size);
    line-height: var(--type-display-lg-lh);
  }
}

.admin-archives__sub {
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-primary);
  opacity: 0.7;
  margin-top: 8px;
  max-width: 36rem;
}

.admin-archives__stats {
  display: flex;
  gap: var(--space-stack-md);
}

.admin-archives__stat {
  min-width: 120px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: var(--radius-md);
}

.admin-archives__stat-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
  opacity: 0.6;
  margin-bottom: 4px;
}

.admin-archives__stat-value {
  font-family: var(--font-display);
  font-size: var(--type-headline-md-size);
  font-weight: var(--type-headline-md-weight);
  color: var(--color-primary);
}

.admin-archives__stat-value--rides {
  color: var(--color-rides);
}
</style>
