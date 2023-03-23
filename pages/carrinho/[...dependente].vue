<script setup lang="ts">
import type { TransitionProps } from 'vue'
import type { CartDependente, CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

definePageMeta({
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
  validate: async (route) => {
    const [_ignore, index] = route.params.dependente

    if (!index)
      return true

    const { getDependente } = useCartStore()
    const dependente = getDependente(+index)

    return !!dependente
  },
})

const store = useCartStore()
const route = useRoute()
const [_ignore, index] = route.params.dependente
const dependente = store.getDependente(+index)

const handleFormValidationChange = (value: boolean) => {
  store.updateStepValidation({ value, step: 'dependente' })
}

const handleFormSubmit = (val: CartDependente) => {
  dependente ? store.updateDependente(val, +index) : store.addDependente(val)
  navigateTo(CART_ROUTES.checkout)
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
  <v-row>
    <v-col cols="12">
      <h2 class="text-primary font-weight-bold mb-2">
        <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-4" />Identifique o dependente
      </h2>
    </v-col>
    <v-col cols="12" md="7">
      <v-card class="px-6 py-8">
        <FormDependente :dependente="dependente" @submit="handleFormSubmit" @valid="handleFormValidationChange" />
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
