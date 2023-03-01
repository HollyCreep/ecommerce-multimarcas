<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'
import { CartSteps } from '~~/types/cart'

const store = useCartStore()
const { state } = storeToRefs(store)

const handleFormValidationChange = (value: boolean) => {
  store.updateStepValidation({ value, step: CartSteps.titular })
}

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
  <div>
    <h2 class="text-primary font-weight-bold mb-8">
      <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-4" />Identifique o titular do novo plano
    </h2>
    <v-card class="px-6 py-8">
      <FormCustomer v-model:customer="state.titular.customer" @valid="handleFormValidationChange" />
    </v-card>
  </div>
</template>

<style scoped>

</style>
