<script setup lang="ts">
// import { storeToRefs } from 'pinia'
// import { CART_ROUTES } from '~~/types/cart'
// const store = useCartStore()
// const { cart } = storeToRefs(store)

// const route = useRoute()
// Object.entries(CART_ROUTES).forEach(([step, cartRoute]) => {
//   if (cartRoute.includes(route.path))
//     cart.value.step = +step
// })
</script>

<template>
  <div>
    <CartSteps />
    <NuxtPage />
  </div>
</template>
