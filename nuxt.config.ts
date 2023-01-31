import type { HookResult } from '@unhead/schema'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  imports: { dirs: ['stores', 'composables', 'composables/**/*.api.ts'] },

  components: [{ path: '~/components/', pathPrefix: false }],

  css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/scss/main.scss'],

  vite: { ssr: { noExternal: ['vuetify'] } },

  build: { transpile: ['vuetify'] },
  modules: [
    'nuxt-icons',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    async (_options, nuxt) => {
      await nuxt.hooks.hook(
        'vite:extendConfig',
        config =>
          config.plugins
          && (config.plugins.push(vuetify()) as unknown as HookResult),
      )
    },
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
})
