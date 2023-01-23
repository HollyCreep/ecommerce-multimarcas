import { acceptHMRUpdate, defineStore } from 'pinia'
import { Brands, Companies } from '~~/types/enums'

export const useOdontoPrevStore = defineStore('odontoPrev', () => {
  const name = ref(Brands.ODONTO_PREV)
  const friendly_name = ref(Companies[Brands.ODONTO_PREV])

  const resources = computed(() => ({ name }))

  return { name, friendly_name, resources }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOdontoPrevStore, import.meta.hot))
