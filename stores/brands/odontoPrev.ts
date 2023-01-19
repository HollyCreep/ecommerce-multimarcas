import { acceptHMRUpdate, defineStore } from 'pinia'
import { Brands, Companies } from '~~/types/enums'

export const useOdontoPrevStore = defineStore('odontoPrev', () => {
  const name = ref(Companies[Brands.ODONTO_PREV])

  const resources = computed(() => ({ name }))

  return { name, resources }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOdontoPrevStore, import.meta.hot))
