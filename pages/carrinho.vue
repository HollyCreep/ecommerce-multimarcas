<script setup lang="ts">
const store = useCartStore()
const hasPlan = computed(() => !!store.state.titular.product)

definePageMeta({
  middleware: (to) => {
    const store = useCartStore()
    if (store.allStepsValid) {
      const route = cartUtils.getActivePaymentTypeRoute(store.state.paymentMethod)
      if (!!route && route !== to.path)
        return route
    }
  },
})
</script>

<template>
  <div class="odp-cart-wrapper container-fluid py-16">
    <NuxtPage v-if="hasPlan" />
    <CartEmptyCart v-else variant="flat" color="background" class="pa-16" />
  </div>
</template>
