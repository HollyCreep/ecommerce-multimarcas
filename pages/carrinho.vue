<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Dependente from './ignore/cart/dependente/index.vue'
import Checkout from './ignore/cart/checkout/index.vue'
import type { CartSteps } from '~~/types/cart'
import type { IStepItem } from '~~/components/base/Steps.vue'
import FormCustomer from '@/components/form/Customer.vue'
const store = useCartStore()
const { cart } = storeToRefs(store)

const components: Record<CartSteps, any> = {
  0: FormCustomer,
  1: Dependente,
  2: Checkout,
}

const items = ref<IStepItem[]>([
  { text: 'Cadastrar titular', value: 0, valid: false, required: true },
  { text: 'Detalhes Pagamento', value: 2 },
])
</script>

<template>
  <v-container class="bg-background">
    <v-row>
      <v-col cols="8">
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
      </v-col>
      <v-col cols="4">
        <v-card>Resumo do pedido</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
