<script setup lang="ts">
import { storeToRefs } from 'pinia'
import StepTitular from '@/components/ignore/cart/titular/index.vue'
import StepDependente from '@/components/ignore/cart/dependente/index.vue'
import StepCheckout from '@/components/ignore/cart/checkout/index.vue'
import type { CartSteps } from '~~/types/cart'
import type { IStepItem } from '~~/components/base/Steps.vue'
const store = useCartStore()
const { cart } = storeToRefs(store)

type FormCustomerType = typeof StepTitular
type DependenteType = typeof StepDependente
type CheckoutType = typeof StepCheckout
type Component = FormCustomerType | DependenteType | CheckoutType

const components: Record<CartSteps, Component> = {
  0: StepTitular,
  1: StepDependente,
  2: StepCheckout,
}

const state = reactive({
  items: [
    { text: 'Cadastrar titular', value: 0, valid: false, required: true },
    { text: 'Detalhes Pagamento', value: 2 },
  ] as IStepItem[],
})

const handleStepValidationChange = (val: boolean, index: keyof typeof state.items) => {
  (state.items[index] as IStepItem).valid = val
}
</script>

<template>
  <v-container class="bg-background">
    <v-row>
      <v-col cols="8">
        <v-window v-model.number="cart.step">
          <v-window-item
            v-for="(component, i) in components"
            :key="`step-${i}`"
            :value="Number(i)"
            class="pa-1"
          >
            <Component :is="component" @valid="(val: boolean) => handleStepValidationChange(val, i)" />
          </v-window-item>
        </v-window>
      </v-col>
      <v-col cols="4">
        <Steps v-model:step="cart.step" :items="state.items" class="mb-6" />
        <v-card>Resumo do pedido</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
