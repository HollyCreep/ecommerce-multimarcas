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
  <v-radio-group v-model="activeComponent" inline mandatory color="primary">
    <v-radio label="Radio 2" value="FormCreditCard" />
    <v-radio label="Radio 1" value="FormBoleto" />
    <v-radio label="Radio 3" value="FormDebit" />
  </v-radio-group>

  <v-scroll-x-transition mode="out-in">
    <component :is="components[activeComponent]" />
  </v-scroll-x-transition>
</template>

<style scoped>

</style>
