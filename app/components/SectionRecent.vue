<template>
  <section class="recent container">
    <h3 class="recent__heading">Recent Updates</h3>
    <PostCards />
  </section>
</template>

<style scoped>
.recent {
  padding-block: var(--space-stack-md);
}

.recent__heading {
  font-size: var(--type-headline-md-size);
  font-weight: var(--type-headline-md-weight);
  margin-bottom: var(--space-stack-md);
}
</style>
