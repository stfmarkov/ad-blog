<template>
  <section class="featured container">
    <div class="featured__header">
      <div>
        <span class="featured__eyebrow">FEATURED ADVENTURE</span>
        <h3 class="featured__title">The 4,000 Mile Solo Ride</h3>
      </div>
      <div class="featured__progress">
        <div class="featured__progress-label">
          <span>ADVENTURE STATUS</span>
          <span>65%</span>
        </div>
        <div class="ink-progress"></div>
      </div>
    </div>

    <div class="featured__card">
      <img class="featured__bg"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0eIs3dhXg7cEcC1uTdN9d2ckxGwxf22jclnbnvPIkwOeV87GTZUQShawsjiwWI3Bvxn-2yfIoH5UE8IAP2QoPgldNv6CEaEL4HvSnpEYr4QByXReb5-gX7V6JxVEz5TGcwffQeg-dv9WQsPvVd3YZGHu2TUkljnJdzbixca0jVvcWKxOIJjdNBnFejooJNaUjZnyJ1_d3olhTrlZsuPuht9wvA2PRgk1pRocpMbpvZoiZq_TemD_-LKGGOtNpk3b8Qu6Wm1uYtw"
        alt="A lone motorcyclist parked on a mountain ridge during a misty blue hour" />
      <div class="featured__gradient" aria-hidden="true"></div>
      <div class="featured__body">
        <div class="featured__pills">
          <span class="pill pill--rides">#RIDES</span>
          <span class="pill pill--frosted">12 MIN READ</span>
        </div>
        <p class="featured__quote">
          "I didn't expect the clutch to snap in the middle of a thunderstorm in rural Montana.
          Here is how I survived the night and fixed it with nothing but a multitool and stubbornness."
        </p>
        <AppButton variant="surface">
          READ THE LOG
          <Icon name="material-symbols:history-edu" />
        </AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured {
  padding-block: var(--space-stack-lg);
}

.featured__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-stack-sm);
  gap: var(--space-gutter);
}

.featured__eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  color: var(--color-primary);
  margin-bottom: 4px;
}

.featured__title {
  font-size: var(--type-headline-md-size);
  font-weight: var(--type-headline-md-weight);
}

.featured__progress {
  flex-shrink: 0;
  width: 192px;
  display: none;
}

@media (min-width: 768px) {
  .featured__progress {
    display: block;
  }
}

.featured__progress-label {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-on-surface-variant);
  margin-bottom: 6px;
}

.featured__card {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  border: 2px solid var(--color-outline);
  height: 500px;
  display: flex;
  align-items: flex-end;
}

.featured__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured__gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.20) 50%, transparent 100%);
}

.featured__body {
  position: relative;
  z-index: 1;
  padding: var(--space-stack-md);
  color: white;
  max-width: 640px;
}

.featured__pills {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  color: white;
}

.pill--rides {
  background-color: var(--color-rides);
}

.pill--frosted {
  background: rgba(255, 255, 255, 0.20);
  backdrop-filter: blur(8px);
}

.featured__quote {
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-surface-container-highest);
  margin-bottom: 24px;
  font-style: italic;
}
</style>
