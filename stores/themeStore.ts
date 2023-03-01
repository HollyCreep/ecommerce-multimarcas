import { defineStore } from 'pinia'
import { useOdontoPrevStore } from './brands/odontoPrev'
import { useOdontoSystemStore } from './brands/odontoSystem'
import { Brands } from '~~/types/enums'
import type { IThemeStore } from '~~/types'

export const useThemeStore = defineStore('theme', () => {
  const odontoPrevStore = useOdontoPrevStore()
  const odontoSystemStore = useOdontoSystemStore()

  const brands = {
    odontoPrev: odontoPrevStore,
    odontoSystem: odontoSystemStore,
  } as const

  const private_active_brand = ref(Brands.ODONTO_PREV)

  function setActiveBrand(domain: Brands) {
    private_active_brand.value = Object.prototype.hasOwnProperty.call(brands, domain) ? domain : Brands.ODONTO_PREV
  }

  const activeBrand = computed<IThemeStore>(() => brands?.[private_active_brand.value as keyof typeof brands] || brands[Brands.ODONTO_PREV])

  return { activeBrand, setActiveBrand }
})
