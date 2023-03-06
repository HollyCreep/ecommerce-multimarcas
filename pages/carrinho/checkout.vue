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
  <v-row>
    <v-col cols="12">
      <h2 class="text-primary font-weight-bold mb-2">
        <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-4" />Detalhes e pagamento
      </h2>
    </v-col>
    <v-col cols="12" md="7">
      <v-card class="px-6 py-8">
        <h4 class="text-primary font-weight-bold">
          Escolha a forma de pagamento
        </h4>
        <FormPayment />
      </v-card>
    </v-col>
    <v-col cols="12" md="4" offset-md="1" order="first" order-md="last">
      <CartSteps class="mb-8" />
      <CartSummaryCard />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
