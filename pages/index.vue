<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import odontoPrev from '@/components/ignore/home/odontoPrev/index.vue'
import odontoSystem from '@/components/ignore/home/odontoSystem/index.vue'
import type { DynamicBrandComponent } from '~~/types'

definePageMeta({
  layout: 'home',
})

const store = useThemeStore()
const { activeBrand } = storeToRefs(store)
const components: DynamicBrandComponent = { odontoPrev, odontoSystem }
</script>

<template>
  <component :is="components[activeBrand.name]" />
</template>
