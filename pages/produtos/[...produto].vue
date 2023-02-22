<script setup lang="ts">
import { storeToRefs } from 'pinia'
import odontoPrev from './ignore/produto/odontoPrev/index.vue'
import odontoSystem from './ignore/produto/odontoSystem/index.vue'

const route = useRoute()
const router = useRouter()
const { isNumber, getProductFriendlyName } = useUtils()

const id = route.params.produto[0]
const productStore = useProductStore()
const product = await productStore.getProduct(id)

isNumber(id) && router.replace(`/produtos/${getProductFriendlyName(product.nome)}`)

const themeStore = useThemeStore()
const { activeBrand } = storeToRefs(themeStore)
const components = { odontoPrev, odontoSystem }
</script>

<template>
  <component :is="components[activeBrand.name]" :produto="product" />
</template>
