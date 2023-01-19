import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import themes from '@/themes'
import { Brands } from '~~/types/enums'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: Brands.ODONTO_PREV,
      themes,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
