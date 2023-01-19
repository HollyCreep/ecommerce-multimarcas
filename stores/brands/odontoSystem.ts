import { acceptHMRUpdate, defineStore } from 'pinia'
import { Brands, Companies } from '~~/types/enums'

export const useOdontoSystemStore = defineStore('odontoSystem', () => {
  const name = ref(Companies[Brands.ODONTO_SYSTEM])
  const resources = computed(() => ({ name }))
  return { name, resources }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOdontoSystemStore, import.meta.hot))
