import type { HookResult } from '@unhead/schema'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/scss/main.scss'],
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },
  imports: {
    dirs: ['stores', 'composables'],
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    async (_options, nuxt) => {
      await nuxt.hooks.hook(
        'vite:extendConfig',
        (config) =>
          config.plugins &&
          (config.plugins.push(vuetify()) as unknown as HookResult)
      )
    },
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  googleFonts: {
    families: {
      'Exo+2': {
        wght: [300, 400, 500, 600],
        ital: [],
      },
      'Noto+Sans': {
        wght: [400, 600, 700],
        ital: [],
      },
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: 'https://api.odontoprev.com.br:8243',
    },
  },
})
