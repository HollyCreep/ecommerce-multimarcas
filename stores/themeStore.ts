import { acceptHMRUpdate, defineStore } from 'pinia'
import { useOdontoPrevStore } from './brands/odontoPrev'
import { useOdontoSystemStore } from './brands/odontoSystem'
import { Brands } from '~~/types/enums'

export const useThemeStore = defineStore('theme', () => {
  const odontoPrevStore = useOdontoPrevStore()
  const odontoSystemStore = useOdontoSystemStore()

  const brands = {
    odontoPrev: odontoPrevStore,
    odontoSystem: odontoSystemStore,
  }

  const private_active_brand = ref(Brands.ODONTO_PREV)

  function setActiveBrand(domain: Brands) {
    private_active_brand.value = domain
  }

  const activeBrand = computed(() => brands[private_active_brand.value])

  return { activeBrand, setActiveBrand }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
