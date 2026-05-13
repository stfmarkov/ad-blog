<script setup lang="ts">
const filters = ['#PYTHON', '#AI_MODELS', '#HARDWARE']

const iconCards = [
  {
    icon: 'material-symbols:memory',
    tone: 'teal' as const,
    title: 'Building a Raspberry Pi 5 Kubernetes Cluster',
    description:
      'Step-by-step from raw hardware to a functional K3s cluster with automated load balancing.',
  },
  {
    icon: 'material-symbols:api',
    tone: 'blue' as const,
    title: 'REST vs GraphQL in 2025',
    description:
      'The case for keeping it simple. Why I\'m migrating back to structured REST endpoints for scale.',
  },
  {
    icon: 'material-symbols:bug-report',
    tone: 'tertiary' as const,
    title: 'Heisenbugs & Horror Stories',
    description:
      'A collection of the most elusive bugs I\'ve ever hunted in the wild of production environments.',
  },
]
</script>

<template>
  <section class="code-grid container">
    <!-- Section header -->
    <div class="code-grid__header">
      <h2 class="code-grid__title">Terminal Feed</h2>
      <div class="code-grid__filters" aria-label="Filter by tag">
        <span
          v-for="tag in filters"
          :key="tag"
          class="code-grid__filter-tag"
        >{{ tag }}</span>
      </div>
    </div>

    <!-- Bento grid -->
    <div class="code-grid__bento">

      <!-- Large featured card -->
      <article class="bento-featured">
        <div class="bento-featured__image-wrap">
          <img
            src="/images/screen.webp"
            alt="High-tech digital laboratory setting featuring advanced neural network visualizations"
            class="bento-featured__image"
          />
          <span class="bento-featured__badge">FEATURED REPO</span>
        </div>
        <div class="bento-featured__body">
          <h3 class="bento-featured__title">
            Training LLMs on Edge Hardware: A Practical Guide
          </h3>
          <p class="bento-featured__excerpt">
            How to squeeze high-performance inference out of a modest GPU cluster using
            quantization and selective pruning techniques. No cloud required.
          </p>
          <div class="bento-featured__meta">
            <span class="bento-featured__meta-item">
              <Icon name="material-symbols:schedule" :size="16" />
              12 MIN READ
            </span>
            <span class="bento-featured__meta-item">
              <Icon name="material-symbols:database" :size="16" />
              4.2K STARS
            </span>
          </div>
        </div>
      </article>

      <!-- Sidebar: two stacked highlight cards -->
      <div class="bento-sidebar">
        <!-- Daily Code Snippet -->
        <div class="bento-highlight bento-highlight--teal">
          <div class="bento-highlight__body">
            <Icon name="material-symbols:bolt" :size="40" class="bento-highlight__icon bento-highlight__icon--teal" />
            <h4 class="bento-highlight__title">Daily Code Snippet</h4>
            <p class="bento-highlight__desc">
              AsyncIO patterns for high-concurrency sensor data ingestion.
            </p>
          </div>
          <a href="#" class="bento-highlight__link bento-highlight__link--teal">
            COPY RAW <Icon name="material-symbols:chevron-right" :size="16" />
          </a>
        </div>

        <!-- AI Ethics Lab -->
        <div class="bento-highlight bento-highlight--tertiary">
          <div class="bento-highlight__body">
            <Icon name="material-symbols:psychology" :size="40" class="bento-highlight__icon bento-highlight__icon--tertiary" />
            <h4 class="bento-highlight__title bento-highlight__title--tertiary">AI Ethics Lab</h4>
            <p class="bento-highlight__desc bento-highlight__desc--tertiary">
              Reflections on the alignment problem in open-source models.
            </p>
          </div>
          <a href="#" class="bento-highlight__link bento-highlight__link--tertiary">
            READ THOUGHTS <Icon name="material-symbols:chevron-right" :size="16" />
          </a>
        </div>
      </div>

      <!-- Three icon cards -->
      <IconCard
        v-for="card in iconCards"
        :key="card.title"
        variant="bento"
        :icon="card.icon"
        :tone="card.tone"
        :title="card.title"
        :description="card.description"
      />

    </div>
  </section>
</template>

<style scoped>
.code-grid {
  padding-block: var(--space-stack-lg);
}

/* ── Header ───────────────────────────────────── */
.code-grid__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-stack-sm);
  margin-bottom: var(--space-stack-md);
}

.code-grid__title {
  font-size: var(--type-headline-md-size);
  font-weight: var(--type-headline-md-weight);
  color: var(--color-primary);
}

.code-grid__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.code-grid__filter-tag {
  background-color: var(--color-surface-container-high);
  color: var(--color-on-surface-variant);
  border: 1px solid var(--color-outline-variant);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ── Bento grid ───────────────────────────────── */
.code-grid__bento {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gutter);
}

@media (min-width: 768px) {
  .code-grid__bento {
    grid-template-columns: repeat(12, 1fr);
  }
  .bento-featured   { grid-column: span 8; }
  .bento-sidebar    { grid-column: span 4; }
  .code-grid__bento > .icon-card--bento { grid-column: span 4; }
}

/* ── Featured card ────────────────────────────── */
.bento-featured {
  background-color: var(--color-surface-container-low);
  border: 2px solid var(--color-outline-variant);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.bento-featured:hover { border-color: var(--color-matrix-teal); }

.bento-featured__image-wrap {
  position: relative;
  height: 256px;
  overflow: hidden;
}

.bento-featured__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.bento-featured:hover .bento-featured__image { transform: scale(1.05); }

.bento-featured__badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-md);
}

.bento-featured__body {
  padding: var(--space-stack-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.bento-featured__title {
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  color: var(--color-primary);
  transition: color var(--transition-fast);
}

.bento-featured:hover .bento-featured__title { color: var(--color-matrix-blue); }

.bento-featured__excerpt {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
}

.bento-featured__meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
}

.bento-featured__meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

/* ── Sidebar ──────────────────────────────────── */
.bento-sidebar {
  display: flex;
  flex-direction: row;
  gap: var(--space-gutter);
}

@media (min-width: 768px) {
  .bento-sidebar { flex-direction: column; }
}

.bento-highlight {
  flex: 1;
  border: 2px solid;
  border-radius: var(--radius-xl);
  padding: var(--space-stack-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-stack-sm);
}

.bento-highlight--teal {
  background-color: rgba(0, 180, 216, 0.05);
  border-color: rgba(0, 180, 216, 0.30);
}

.bento-highlight--tertiary {
  background-color: var(--color-tertiary-fixed);
  border-color: var(--color-tertiary-container);
}

.bento-highlight__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.bento-highlight__icon--teal     { color: var(--color-matrix-blue); }
.bento-highlight__icon--tertiary { color: var(--color-on-tertiary-container); }

.bento-highlight__title {
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  color: var(--color-primary);
}

.bento-highlight__title--tertiary { color: var(--color-on-tertiary-container); }

.bento-highlight__desc {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
}

.bento-highlight__desc--tertiary { color: var(--color-on-tertiary-container); opacity: 0.8; }

.bento-highlight__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: gap var(--transition-fast);
  margin-top: auto;
}

.bento-highlight__link--teal     { color: var(--color-primary); }
.bento-highlight__link--tertiary { color: var(--color-on-tertiary-container); }
.bento-highlight__link:hover     { gap: 8px; }

/* IconCard (bento variant) grid placement — card styles live in IconCard.vue */
</style>
