<script setup lang="ts">
import type { CartSteps } from '~~/types/enums'

const store = useCartStore()

const teste: Record<CartSteps, any> = {
  0: 'Titular',
  1: 'Dependente',
  2: 'Checkout',
}
</script>

<template>
  <h1>Carrinho</h1>
  <h1>{{ teste[store.cart.step] }}</h1>

  <v-btn color="error" @click="store.cart.step--">
    -
  </v-btn>
  <v-btn color="success" @click="store.cart.step++">
    +
  </v-btn>
</template>

<style scoped>

</style>
