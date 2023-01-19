import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useOdontoPrevStore } from './brands/odontoPrev'
import { useOdontoSystemStore } from './brands/odontoSystem'
import { Brands } from '~~/types/enums'

export const useThemeStore = defineStore('theme', () => {
  const odontoPrevStore = useOdontoPrevStore()
  const odontoSystemStore = useOdontoSystemStore()

  const activeBrand = ref(Brands.ODONTO_PREV)

  const brands = {
    odontoPrev: storeToRefs(odontoPrevStore),
    odontoSystem: storeToRefs(odontoSystemStore),
  }

  function setActiveBrand(domain: Brands) {
    activeBrand.value = domain
  }

  const getActiveBrand = computed(() => brands[activeBrand.value])

  return { getActiveBrand, setActiveBrand }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
