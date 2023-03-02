<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    const id = route.params.id[0]
    const { getDependente } = useCartStore()
    const dependente = getDependente(id)

    return !!dependente
  },
})

const route = useRoute()
const id = route.params.id[0]
</script>

<template>
  <h1>Dependente {{ id }}</h1>
</template>
