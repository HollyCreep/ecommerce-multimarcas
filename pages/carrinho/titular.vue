<script setup lang="ts">
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'

const handleFormValidationChange = (val: boolean) => {

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
      <Icon name="user" color="primary" secondary-color="primary-lighten-1" />
      Identifique o titular do novo plano
    </h2>
    <v-card>
      <FormCustomer @valid="handleFormValidationChange" />
    </v-card>
  </div>
</template>

<style scoped>

</style>
