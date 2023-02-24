<script setup lang="ts">
import type { FormArraySchema } from 'formvuelate'
import * as Yup from 'yup'

const schema = ref<FormArraySchema>([
  {
    component: 'FormText',
    model: 'name',
    name: 'name',
    validations: Yup.string().required(),
    class: 'v-col-12 v-col-md-6',
  },
  {
    component: 'FormText',
    model: 'lastName',
    name: 'lastName',
    validations: Yup.string().required(),
    class: 'v-col-12 v-col-md-6',
  },
  {
    component: 'FormText',
    model: 'email',
    name: 'email',
    validations: Yup.string().email().required(),
    label: 'email',
    class: 'v-col-12 v-col-md-6',
  },
])
</script>

<template>
  <div>Checkout</div>
  <v-container>
    <FormDynamicForm v-slot="{ validation: { meta } }" :schema="schema" schema-row-classes="v-row">
      <v-btn :color="!meta.valid ? 'error' : 'success'" type="submit">
        Submit
      </v-btn>
    </FormDynamicForm>
  </v-container>
</template>

<style scoped>

</style>
