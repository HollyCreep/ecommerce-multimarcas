<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

const store = useCartStore()
const { state } = storeToRefs(store)

const handleFormSubmit = () => {
  store.updateStepValidation({ value: true, step: 'titular' })
  const rota = store.isTitularMenorDeIdade ? CART_ROUTES.responsavel : CART_ROUTES.checkout
  navigateTo(rota)
}

definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in',
  },
  middleware(to, from) {
    const store = useCartStore()
    if (!store.state.titular.product)
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
    <v-col cols="12" md="4" offset-md="1" order-md="last">
      <CartSteps class="mb-8" />
      <CartPlanPeriodSwitcher class="mb-8" />
      <CartFeaturedPlanCard :key="state.selectedPeriodType" :plan="store.items[0].plan" class="mb-6" dark />
    </v-col>
    <v-col cols="12">
      <h2 class="text-primary font-weight-bold mb-2">
        <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-4" />Identifique o titular do novo plano
      </h2>
    </v-col>
    <v-col cols="12" md="7">
      <v-card class="px-6 py-8">
        <FormTitular v-model:customer="state.titular.customer" @submit="handleFormSubmit" />
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
