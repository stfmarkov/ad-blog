<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <span class="footer__brand-name">AdventurousNerd</span>
        <p class="footer__copy">© {{ currentYear }} AdventurousNerd. Built for curious explorers.</p>
      </div>

      <nav class="footer__nav" aria-label="Footer navigation">
        <NuxtLink to="/about"      class="footer__link">About</NuxtLink>
        <NuxtLink to="/rss"        class="footer__link">RSS Feed</NuxtLink>
        <NuxtLink to="/contact"    class="footer__link">Contact</NuxtLink>
      </nav>

      <div class="footer__icons" aria-label="Social links">
        <Icon name="material-symbols:rss-feed"  class="footer__icon" :size="24" role="img" aria-label="RSS Feed" />
        <Icon name="material-symbols:terminal"  class="footer__icon" :size="24" role="img" aria-label="Terminal" />
        <Icon name="material-symbols:share"     class="footer__icon" :size="24" role="img" aria-label="Share" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--color-surface-container-lowest);
  border-top: 2px solid var(--color-outline-variant);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  margin-top: var(--space-stack-lg);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-stack-sm);
  padding-block: var(--space-stack-md);
  padding-inline: var(--space-margin-mobile);
  max-width: var(--container-max);
  margin: 0 auto;
}

@media (min-width: 768px) {
  .footer__inner {
    flex-direction: row;
    align-items: center;
    padding-inline: var(--space-margin-desktop);
  }
}

/* Brand */
.footer__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

@media (min-width: 768px) {
  .footer__brand { align-items: flex-start; }
}

.footer__brand-name {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  color: var(--color-primary);
}

.footer__copy {
  font-size: var(--type-body-md-size);
  color: var(--color-on-surface-variant);
  text-align: center;
}

@media (min-width: 768px) {
  .footer__copy { text-align: left; }
}

/* Nav */
.footer__nav {
  display: flex;
  gap: 24px;
}

.footer__link {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link:hover { color: var(--color-primary); }

/* Social icons */
.footer__icons {
  display: flex;
  gap: 16px;
}

.footer__icon {
  color: var(--color-secondary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.footer__icon:hover { color: var(--color-primary); }
</style>
