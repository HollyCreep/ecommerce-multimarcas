<script setup lang="ts">
const store = useCartStore()
const hasPlan = computed(() => !!store.state.titular.product)
</script>

<template>
  <div class="odp-cart-wrapper container-fluid py-16">
    <NuxtPage v-if="hasPlan" />
    <CartEmptyCart v-else variant="flat" color="background" class="pa-16" />
  </div>
</template>
