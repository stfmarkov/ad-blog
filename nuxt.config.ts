// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // @nuxt/fonts self-hosts the three text fonts at build time.
  // Explicit families are needed because our CSS references them through
  // variables (--font-display etc.) which the scanner cannot resolve.
  fonts: {
    families: [
      { name: 'Bricolage Grotesque', weights: [400, 600, 700, 800] },
      { name: 'Plus Jakarta Sans',   weights: [400, 600] },
      { name: 'JetBrains Mono',      weights: [400, 700] },
    ],
  },

  modules: [
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
})
