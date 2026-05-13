<template>
  <div class="layout">
    <TheNav />
    <main class="layout__main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.layout__main {
  flex: 1;
}
</style>
