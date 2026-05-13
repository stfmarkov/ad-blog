<template>
  <header class="nav">
    <div class="nav__inner">
      <!-- Brand -->
      <NuxtLink to="/" class="nav__brand">
        <Icon name="material-symbols:explore" class="nav__brand-icon" :size="32" />
        <span class="nav__brand-name">AdventurousNerd</span>
      </NuxtLink>

      <!-- Desktop links -->
      <nav class="nav__links" aria-label="Primary navigation">
        <NuxtLink to="/rides"  class="nav__link">Rides</NuxtLink>
        <NuxtLink to="/quests" class="nav__link">Quests</NuxtLink>
        <NuxtLink to="/code"   class="nav__link">Code</NuxtLink>
        <a href="#newsletter" class="nav__btn hard-shadow hard-shadow-hover">Newsletter</a>
      </nav>

      <!-- Mobile hamburger -->
      <button class="nav__hamburger" aria-label="Open menu">
        <Icon name="material-symbols:menu" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(248, 249, 255, 0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 2px solid var(--color-outline-variant);
}

.nav__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-margin-mobile);
  height: 80px;
}

@media (min-width: 768px) {
  .nav__inner {
    padding: 0 var(--space-margin-desktop);
  }
}

/* Brand */
.nav__brand {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: var(--color-primary);
}

.nav__brand-icon {
  color: var(--color-primary);
}

.nav__brand-name {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--color-primary);
}

@media (min-width: 768px) {
  .nav__brand-name {
    font-size: var(--type-display-lg-size);
  }
}

/* Desktop nav */
.nav__links {
  display: none;
  align-items: center;
  gap: 32px;
}

@media (min-width: 768px) {
  .nav__links {
    display: flex;
  }
}

.nav__link {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav__link:hover,
.nav__link.router-link-active {
  color: var(--color-primary);
}

/* Newsletter CTA */
.nav__btn {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 8px 24px;
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

/* Mobile hamburger */
.nav__hamburger {
  display: flex;
  align-items: center;
  color: var(--color-on-surface-variant);
}

@media (min-width: 768px) {
  .nav__hamburger {
    display: none;
  }
}

/* Hard shadow utilities (used by multiple components) */
.hard-shadow       { box-shadow: var(--shadow-hard); }
.hard-shadow-hover { transition: transform var(--transition-fast), box-shadow var(--transition-fast); }
.hard-shadow-hover:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-hard-hover);
}
</style>
