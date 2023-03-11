<script setup lang="ts">
import type { IFieldSetCard } from '../FieldSetCard.vue'
import type { IProduct } from '~~/types/product'

defineProps<{ produto: IProduct; cobertura: IFieldSetCard; naoCobertura: IFieldSetCard }>()
</script>

<template>
  <v-card rounded="lg">
    <h1>teste</h1>
    <v-card-text>
      <FieldSetCard v-bind="cobertura" class="mb-4" />
      <FieldSetCard v-bind="naoCobertura" />
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
