<script setup lang="ts">
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in',
  },
  middleware(to, from) {
    if (Object.prototype.hasOwnProperty.call(to.meta.pageTransition, 'name')) {
      const previousStep = cartUtils.getRouteStep(from.path as CartRoute)
      const currentStep = cartUtils.getRouteStep(to.path as CartRoute);
      (to.meta.pageTransition as TransitionProps).name = currentStep > previousStep ? 'slide-left' : 'slide-right'
    }
  },
})
</script>

<template>
  <div>Checkout</div>
</template>

<style scoped>

</style>
