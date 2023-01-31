import { acceptHMRUpdate, defineStore } from 'pinia'
import resources from './resources'
import { Brands, Companies } from '~~/types/enums'
import type { IThemeStore } from '~~/types'

export const useOdontoPrevStore = defineStore('odontoPrev', {
  state: (): IThemeStore => ({
    name: Brands.ODONTO_PREV,
    friendly_name: Companies[Brands.ODONTO_PREV],
  }),
  getters: {
    resources() {
      return resources
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOdontoPrevStore, import.meta.hot))
