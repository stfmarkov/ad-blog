<template>
  <section class="hero container">
    <!-- Left: text -->
    <div class="hero__content">
      <div class="hero__badge">
        <Icon name="material-symbols:auto-awesome" class="hero__badge-icon" :size="16" />
        <span class="hero__badge-label">New Expedition Logged</span>
      </div>

      <h2 class="hero__title">
        Digital Craftsman by Day,
        <span class="hero__highlight">Dungeon Crawler</span> by Night.
      </h2>

      <p class="hero__sub">
        Welcome to my digitized field journal. I share long-distance motorcycle
        logs, homebrew TTRPG mechanics, and deep dives into the chaotic world
        of AI and code.
      </p>

      <div class="hero__actions">
        <AppButton variant="primary">
          START EXPLORING
          <Icon name="material-symbols:arrow-forward" />
        </AppButton>
      </div>
    </div>

    <!-- Right: image -->
    <div class="hero__image-wrap">
      <div class="hero__image-backdrop" aria-hidden="true"></div>
      <img
        class="hero__image hard-shadow"
        src="/images/keyboard.webp"
        alt="Explorer's desk with a film camera, leather journal, mechanical keyboard, and a tabletop d20 die"
      />
      <div class="hero__image-badge" aria-hidden="true">
        <Icon name="material-symbols:star" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-gutter);
  align-items: center;
  padding-block: var(--space-stack-lg);
}

@media (min-width: 768px) {
  .hero { flex-direction: row; }
}

.hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-secondary-container);
  color: var(--color-on-secondary-container);
  padding: 4px 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-outline-variant);
  width: fit-content;
}

.hero__badge-icon {
  line-height: 1;
}

.hero__badge-label {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero__title {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  line-height: var(--type-display-lg-mobile-lh);
  letter-spacing: -0.02em;
  color: var(--color-on-surface);
}

@media (min-width: 768px) {
  .hero__title {
    font-size: var(--type-display-lg-size);
    line-height: var(--type-display-lg-lh);
  }
}

.hero__highlight {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: var(--color-primary);
  text-underline-offset: 6px;
  text-decoration-thickness: 3px;
  color: var(--color-primary);
}

.hero__sub {
  font-family: var(--font-body);
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-on-surface-variant);
  max-width: 480px;
}

.hero__actions {
  padding-top: 16px;
}

.hero__image-wrap {
  flex: 1;
  position: relative;
}

.hero__image-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 100, 149, 0.05);
  border-radius: var(--radius-2xl);
  transform: rotate(-3deg) scale(1.05);
  border: 2px dashed rgba(0, 100, 149, 0.2);
}

.hero__image {
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-2xl);
  border: 2px solid var(--color-primary);
}

.hero__image-badge {
  position: absolute;
  bottom: -16px;
  right: -16px;
  z-index: 2;
  line-height: 1rem;
  background-color: var(--color-tertiary-fixed);
  color: var(--color-on-tertiary-fixed);
  padding: 16px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-hard);
  display: none;
}

@media (min-width: 768px) {
  .hero__image-badge { display: block; }
}
</style>
