<template>
  <div class="admin-insights">
    <div class="admin-insights__tip neo-brutal-card">
      <div class="admin-insights__tip-icon">
        <Icon :name="materialSymbolName('insights')" :size="40" />
      </div>
      <div>
        <h4 class="admin-insights__tip-title">Performance Tip</h4>
        <p class="admin-insights__tip-body">
          Articles categorized under
          <strong class="admin-insights__underline">Rides</strong>
          are seeing a 45% increase in engagement this week. Consider adding
          more high-res photography to these logs.
        </p>
      </div>
    </div>

    <div class="admin-insights__draft neo-brutal-card">
      <div class="admin-insights__draft-head">
        <span class="admin-insights__draft-label">Latest Draft</span>
        <Icon :name="materialSymbolName('pending')" :size="22" class="admin-insights__draft-pending" />
      </div>
      <p class="admin-insights__draft-title">
        Exploring the Neon Alleys of Shinjuku on a 50cc Scooter
      </p>
      <NuxtLink to="/admin/editor" class="admin-insights__draft-link">
        Resume Writing
        <Icon :name="materialSymbolName('arrow-forward')" :size="18" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.admin-insights {
  margin-top: var(--space-stack-lg);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
}

@media (min-width: 768px) {
  .admin-insights {
    grid-template-columns: 2fr 1fr;
  }
}

.admin-insights__tip {
  display: flex;
  align-items: center;
  gap: var(--space-stack-md);
  padding: var(--space-stack-md);
  background-color: var(--color-quests);
  color: var(--color-on-primary);
  border-radius: var(--radius-md);
}

.admin-insights__tip-icon {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: var(--color-on-primary);
}

.admin-insights__tip-title {
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  color: var(--color-on-primary);
  margin-bottom: 8px;
}

.admin-insights__tip-body {
  font-size: var(--type-body-md-size);
  line-height: var(--type-body-md-lh);
  opacity: 0.95;
  color: var(--color-on-primary);
}

.admin-insights__underline {
  text-decoration: underline;
  text-decoration-color: var(--color-rides);
  text-decoration-thickness: 2px;
}

.admin-insights__draft {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-stack-md);
  border-radius: var(--radius-md);
}

.admin-insights__draft-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.admin-insights__draft-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-primary);
}

.admin-insights__draft-pending {
  color: var(--color-primary);
  opacity: 0.3;
}

.admin-insights__draft-title {
  font-weight: 700;
  color: var(--color-primary);
  margin-top: 16px;
  line-height: var(--line-height-tight);
}

.admin-insights__draft-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-rides);
  text-decoration: none;
  transition: gap var(--transition-fast);
}

.admin-insights__draft-link:hover {
  gap: 12px;
}
</style>
