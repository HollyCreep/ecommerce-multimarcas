<script setup lang="ts">
import EmptyCart from '~~/components/cart/EmptyCart.vue'
const store = useCartStore()

const hasPlan = computed(() => !!store.cart.titular.plan)
</script>

<template>
  <h1 v-if="hasPlan">
    Resumo OK
  </h1>
  <EmptyCart v-else variant="flat" color="background" />
</template>

<style scoped>

</style>
