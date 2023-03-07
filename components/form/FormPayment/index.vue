<script setup lang="ts">
import FormBoleto from './FormBoleto.vue'
import FormCreditCard from './FormCreditCard.vue'
import FormDebit from './FormDebit.vue'
const components = {
  FormBoleto,
  FormCreditCard,
  FormDebit,
}

const activeComponent = ref<keyof typeof components>('FormCreditCard')
</script>

<template>
  <v-card class="px-6 py-8 mb-8" rounded="lg">
    <h4 class="text-primary font-weight-bold">
      Escolha a forma de pagamento
    </h4>
    <v-divider class="my-4" />
    <v-radio-group v-model="activeComponent" inline mandatory color="primary" hide-details>
      <v-radio label="Cartão de crédito" value="FormCreditCard" />
      <v-radio label="Débito em conta" value="FormBoleto" />
      <v-radio label="Boleto" value="FormDebit" />
    </v-radio-group>
  </v-card>

  <div class="px-6">
    <v-scroll-x-transition mode="out-in">
      <component :is="components[activeComponent]" />
    </v-scroll-x-transition>
  </div>
</template>

<style scoped>

</style>
