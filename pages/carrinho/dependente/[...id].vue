<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    const id = route.params.id[0]
    const productStore = useProductStore()
    const product = await productStore.getProduct(id)

    return /^\d+$/.test(id) && !!product
  },
})

const route = useRoute()
const id = route.params.id[0]
</script>

<template>
  <h1>Dependente {{ id }}</h1>
</template>
