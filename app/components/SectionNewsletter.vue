<script setup lang="ts">
const email      = ref('')
const subscribed = ref(false)

function handleSubscribe() {
  if (email.value) {
    subscribed.value = true
    email.value = ''
  }
}
</script>

<template>
  <section id="newsletter" class="strip container">
    <StatsStrip />

    <div class="strip__newsletter">
      <h4 class="strip__newsletter-title">Join the party.</h4>
      <p class="strip__newsletter-sub">
        Subscribe to the weekly log for exclusive homebrew content and ride routes.
      </p>
      <form class="strip__form" @submit.prevent="handleSubscribe">
        <input
          v-model="email"
          type="email"
          placeholder="explorer@nerd.com"
          class="strip__input"
          aria-label="Email address"
          required
        />
        <button type="submit" class="strip__submit">
          <Icon name="material-symbols:mail" />
        </button>
      </form>
      <p v-if="subscribed" class="strip__success">✓ You're in! Check your inbox.</p>
    </div>
  </section>
</template>

<style scoped>
.strip {
  background-color: var(--color-primary-container);
  color: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-hard);
  padding: var(--space-stack-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-stack-md);
}

@media (min-width: 768px) {
  .strip { flex-direction: row; }
}

.strip__newsletter {
  max-width: 320px;
  width: 100%;
  text-align: center;
}

@media (min-width: 768px) {
  .strip__newsletter { text-align: right; }
}

.strip__newsletter-title {
  font-family: var(--font-display);
  font-size: var(--type-headline-sm-size);
  font-weight: var(--type-headline-sm-weight);
  color: white;
  margin-bottom: 8px;
}

.strip__newsletter-sub {
  font-size: var(--type-body-md-size);
  color: rgba(255, 255, 255, 0.80);
  margin-bottom: 16px;
  line-height: var(--line-height-relaxed);
}

.strip__form { display: flex; }

.strip__input {
  flex: 1;
  padding: 12px;
  background: var(--color-surface-bright);
  color: var(--color-on-surface);
  border: none;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--type-body-md-size);
  outline: none;
  min-width: 0;
}

.strip__input:focus {
  outline: 2px solid var(--color-inverse-primary);
  outline-offset: -2px;
}

.strip__submit {
  background: var(--color-primary-fixed);
  color: var(--color-primary);
  border: none;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  padding: 0 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background var(--transition-fast);
}

.strip__submit:hover { background: var(--color-inverse-primary); }

.strip__success {
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  color: rgba(255, 255, 255, 0.9);
  text-align: right;
}
</style>
