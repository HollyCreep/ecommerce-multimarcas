import { acceptHMRUpdate, defineStore } from 'pinia'
import resources from './resources'
import { Brands, Companies } from '~~/types/enums'
import type { IThemeStore } from '@/types/index'

export const useOdontoSystemStore = defineStore('odontoSystem', {
  state: (): IThemeStore => ({
    name: Brands.ODONTO_SYSTEM,
    friendly_name: Companies[Brands.ODONTO_SYSTEM],
  }),
  getters: {
    resources() {
      return resources
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOdontoSystemStore, import.meta.hot))
