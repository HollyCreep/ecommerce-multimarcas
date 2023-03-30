<script setup lang="ts">
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in',
  },
  middleware(to, from) {
    const store = useCartStore()

    if (!store.state.titular.customer || !store.state.titular.product)
      return CART_ROUTES.carrinho

    if (Object.prototype.hasOwnProperty.call(to.meta.pageTransition, 'name')) {
      const previousStep = cartUtils.getRouteStep(from.path as CartRoute)
      const currentStep = cartUtils.getRouteStep(to.path as CartRoute);
      (to.meta.pageTransition as TransitionProps).name = currentStep > previousStep ? 'slide-left' : 'slide-right'
    }
  },
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="7">
      <NuxtPage />
    </v-col>
    <v-col cols="12" md="4" offset-md="1" order="first" order-md="last">
      <CartSteps class="mb-8" />
      <CartSummaryCard />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
