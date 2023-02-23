<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Titular from './ignore/cart/titular/index.vue'
import Dependente from './ignore/cart/dependente/index.vue'
import Checkout from './ignore/cart/checkout/index.vue'
import type { CartSteps } from '~~/types/cart'
import type { IStepItem } from '~~/components/base/Steps.vue'

const store = useCartStore()
const { cart } = storeToRefs(store)

const components: Record<CartSteps, any> = {
  0: Titular,
  1: Dependente,
  2: Checkout,
}

const items = reactive<IStepItem[]>([
  { text: 'Cadastrar titular', value: 0, valid: false, required: true },
  { text: 'Detalhes Pagamento', value: 2 },
])
</script>

<template>
  <v-container class="bg-background">
    <Steps v-model:step="cart.step" :items="items" />

    <v-window v-model.number="cart.step">
      <v-window-item
        v-for="(component, n) in components"
        :key="`step-${n}`"
        :value="Number(n)"
      >
        <component :is="component" />
      </v-window-item>
    </v-window>
  </v-container>
</template>
