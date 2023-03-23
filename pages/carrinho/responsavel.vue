<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TransitionProps } from 'vue'
import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

const store = useCartStore()
const { state } = storeToRefs(store)

const handleFormSubmit = () => {
  navigateTo(CART_ROUTES.checkout)
}

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
    <v-col cols="12">
      <h2 class="text-primary font-weight-bold mb-2">
        <Icon name="user" color="primary" secondary-color="primary-lighten-1" class="mr-4" />Identifique o responsável
      </h2>
      <p>Por se tratar de um titular menor de idade, é necessário a inclusão de um responsável.</p>
    </v-col>
    <v-col cols="12" md="7">
      <v-card class="px-6 py-8">
        <FormResponsavel v-model:responsavel="state.responsavel" @submit="handleFormSubmit" />
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
