<script setup lang="ts">
import { storeToRefs } from 'pinia'
import odontoPrev from '@/components/ignore/produto/odontoPrev/index.vue'
import odontoSystem from '@/components/ignore/produto/odontoSystem/index.vue'
import type { DynamicBrandComponent } from '~~/types'

definePageMeta({
  validate: async (route) => {
    const id = route.params.id[0]
    const productStore = useProductStore()
    const product = await productStore.getProduct(id)

    return !!product
  },
})

const route = useRoute()
const router = useRouter()
const { isNumber, getProductFriendlyName } = useUtils()

const id = route.params.id[0]
const productStore = useProductStore()
const product = await productStore.getProduct(id)
provide('product', product)

isNumber(id) && !!product && router.replace(`/produtos/${getProductFriendlyName(product.nome)}`)

const themeStore = useThemeStore()
const { activeBrand } = storeToRefs(themeStore)
const components: DynamicBrandComponent = { odontoPrev, odontoSystem }
</script>

<template>
  <component :is="components[activeBrand.name]" :produto="product" />
</template>
