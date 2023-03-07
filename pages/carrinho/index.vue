<script setup lang="ts">
import { CART_ROUTES } from '~~/types/cart'

const store = useCartStore()
const [titular] = store.items

definePageMeta({
  middleware: () => {
    const store = useCartStore()
    if (store.state.titular.customer)
      return CART_ROUTES.checkout
  },
})
</script>

<template>
  <v-card max-width="460" variant="flat" color="background">
    <h2 class="text-primary font-weight-bold mb-6">
      <Icon name="cart-fill" color="primary" secondary-color="primary-lighten-1" />
      Resumo do pedido
    </h2>
    <div class="mb-10">
      <CartPlanPeriodSwitcher class="mb-8" />
      <CartFeaturedPlanCard :plan="titular.plan" class="mb-6" dark />
      <div class="text-right">
        <v-btn color="secondary" variant="flat" size="large" width="188" to="carrinho/titular">
          Comprar
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
