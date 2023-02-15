<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import odontoPrev from '@/components/pages/home/odontoPrev/index.vue'
import odontoSystem from '@/components/pages/home/odontoSystem/index.vue'
const store = useThemeStore()
const { activeBrand } = storeToRefs(store)
const components = { odontoPrev, odontoSystem }
</script>

<template>
  <component :is="components[activeBrand.name]" />
</template>
