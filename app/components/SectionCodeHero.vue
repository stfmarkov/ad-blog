<template>
  <section class="code-hero container">
    <!-- Left: text -->
    <div class="code-hero__content">
      <div class="code-hero__badge">
        <Icon name="material-symbols:terminal" :size="14" />
        <span>System.Status: Operational</span>
      </div>

      <h1 class="code-hero__title">
        The Silicon <span class="code-hero__accent">Frontier.</span>
      </h1>

      <p class="code-hero__sub">
        A digital field journal exploring the intersection of deep neural
        networks, elegant syntax, and the messy reality of physical computing.
      </p>

      <div class="code-hero__actions">
        <AppButton variant="primary">
          Latest Repos
          <Icon name="material-symbols:chevron-right" />
        </AppButton>
        <AppButton variant="surface">AI Wiki</AppButton>
      </div>
    </div>

    <!-- Right: terminal mock-up -->
    <div class="code-hero__visual">
      <div class="code-hero__glow" aria-hidden="true"></div>
      <div class="code-hero__terminal hard-shadow-teal code-bg">
        <div class="code-hero__term-body">
          <!-- Traffic-light dots -->
          <div class="code-hero__dots" aria-hidden="true">
            <span class="code-hero__dot code-hero__dot--red"></span>
            <span class="code-hero__dot code-hero__dot--amber"></span>
            <span class="code-hero__dot code-hero__dot--teal"></span>
          </div>
          <!-- Decorative code lines -->
          <div class="code-hero__lines" aria-hidden="true">
            <p class="dim">// Initializing AI sequence...</p>
            <p><span class="kw">import</span> torch</p>
            <p><span class="kw">class</span> ExplorerAgent(nn.Module):</p>
            <p>&nbsp;&nbsp;<span class="kw">def</span> __init__(self):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;super().__init__()</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;self.curiosity = <span class="lit">float('inf')</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;self.logic = nn.Linear(512, 1024)</p>
            <p>&nbsp;&nbsp;<span class="kw">def</span> forward(self, terrain):</p>
            <p class="cursor">_</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-lg);
  align-items: center;
  padding-block: var(--space-stack-lg);
}

@media (min-width: 768px) {
  .code-hero { flex-direction: row; }
}

/* ── Left content ─────────────────────────────── */
.code-hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.code-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(0, 245, 212, 0.10);
  color: var(--color-primary);
  border: 1px solid rgba(0, 245, 212, 0.30);
  padding: 4px 16px;
  border-radius: var(--radius-full);
  width: fit-content;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
}

.code-hero__title {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  line-height: var(--type-display-lg-mobile-lh);
  letter-spacing: -0.02em;
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .code-hero__title {
    font-size: var(--type-display-lg-size);
    line-height: var(--type-display-lg-lh);
  }
}

.code-hero__accent { color: var(--color-matrix-blue); }

.code-hero__sub {
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-on-surface-variant);
  max-width: 480px;
}

.code-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-stack-sm);
  padding-top: 16px;
}

/* ── Right visual ─────────────────────────────── */
.code-hero__visual {
  flex: 1;
  position: relative;
  width: 100%;
}

.code-hero__glow {
  position: absolute;
  inset: 0;
  background: rgba(0, 245, 212, 0.20);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  transform: rotate(-3deg) scale(1.05);
  filter: blur(32px);
}

.code-hero__terminal {
  position: relative;
  z-index: 1;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  aspect-ratio: 16 / 10;
  display: flex;
  align-items: stretch;
}

.code-hero__term-body {
  width: 100%;
  background-color: var(--color-inverse-surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0.92;
}

/* Traffic-light dots */
.code-hero__dots { display: flex; gap: 8px; }
.code-hero__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.code-hero__dot--red   { background-color: var(--color-error); }
.code-hero__dot--amber { background-color: var(--color-tertiary-container); }
.code-hero__dot--teal  { background-color: var(--color-matrix-teal); }

/* Code text */
.code-hero__lines {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  color: var(--color-matrix-teal);
  line-height: 1.7;
  overflow: hidden;
}

.code-hero__lines .dim  { opacity: 0.6; }
.code-hero__lines .kw   { color: var(--color-matrix-blue); }
.code-hero__lines .lit  { color: var(--color-tertiary-fixed-dim); }

/* Blinking cursor */
.code-hero__lines .cursor {
  display: inline-block;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>
