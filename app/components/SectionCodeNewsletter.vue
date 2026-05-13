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
  <section class="code-nl container">
    <div class="code-nl__card">
      <!-- Decorative blob -->
      <div class="code-nl__blob" aria-hidden="true"></div>

      <div class="code-nl__body">
        <h2 class="code-nl__title">Sync your neural links.</h2>
        <p class="code-nl__sub">
          Get a weekly digest of curated code snippets, AI breakthroughs, and
          hardware hacks delivered straight to your inbox.
        </p>

        <form class="code-nl__form" @submit.prevent="handleSubscribe">
          <input
            v-model="email"
            type="email"
            placeholder="explorer@terminal.local"
            class="code-nl__input"
            aria-label="Email address"
            required
          />
          <button type="submit" class="code-nl__btn hard-shadow-sm hard-shadow-sm-hover">
            EXECUTE SUBSCRIBE
          </button>
        </form>

        <p v-if="subscribed" class="code-nl__success">
          ✓ Connected. Packets incoming.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.code-nl {
  padding-block: var(--space-stack-lg);
}

.code-nl__card {
  position: relative;
  background-color: var(--color-primary-container);
  border-radius: var(--radius-2xl);
  padding: var(--space-stack-lg);
  overflow: hidden;
}

/* Decorative wiggly blob */
.code-nl__blob {
  position: absolute;
  top: 0;
  right: 0;
  width: 256px;
  height: 256px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  transform: rotate(45deg) translate(30%, -30%);
  pointer-events: none;
}

.code-nl__body {
  position: relative;
  z-index: 1;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
}

.code-nl__title {
  font-family: var(--font-display);
  font-size: var(--type-display-lg-mobile-size);
  font-weight: var(--type-display-lg-weight);
  color: var(--color-on-primary);
}

@media (min-width: 768px) {
  .code-nl__title { font-size: var(--type-headline-md-size); }
}

.code-nl__sub {
  font-size: var(--type-body-lg-size);
  line-height: var(--type-body-lg-lh);
  color: var(--color-on-primary-container);
}

.code-nl__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-sm);
  padding-top: 8px;
}

@media (min-width: 640px) {
  .code-nl__form { flex-direction: row; }
}

.code-nl__input {
  flex: 1;
  background: rgba(255, 255, 255, 0.10);
  border: 2px solid rgba(255, 255, 255, 0.20);
  border-radius: var(--radius-xl);
  padding: 12px 24px;
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  letter-spacing: var(--type-label-caps-spacing);
  outline: none;
  transition: border-color var(--transition-fast);
}

.code-nl__input::placeholder { color: rgba(255, 255, 255, 0.50); }
.code-nl__input:focus { border-color: var(--color-matrix-teal); }

.code-nl__btn {
  background-color: var(--color-matrix-teal);
  color: var(--color-primary);
  border: none;
  border-radius: var(--radius-xl);
  padding: 12px 32px;
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  font-weight: var(--type-label-caps-weight);
  letter-spacing: var(--type-label-caps-spacing);
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
}

.code-nl__success {
  font-family: var(--font-mono);
  font-size: var(--type-label-caps-size);
  letter-spacing: var(--type-label-caps-spacing);
  color: var(--color-matrix-teal);
  text-transform: uppercase;
}
</style>
