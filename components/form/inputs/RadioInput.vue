<script lang="ts" setup>
import { useField } from 'vee-validate'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
})
const nameRef = toRef(props, 'name')
// const { errors, value } = useField(nameRef)
const { errors, value } = useField(nameRef, undefined, {
  type: 'radio',
})
</script>

<template>
  <v-radio-group
    v-model="value"
    v-bind="$attrs"
    :error-messages="errors"
  >
    <template #label>
      <p>{{ label || name }}</p>
    </template>
    <v-radio
      class="text-main font-weight-bold font-soleto"
      label="Masculino"
      :name="name"
      value="MASCULINO"
    />
    <v-radio
      class="text-main font-weight-bold font-soleto"
      label="Feminino"
      :name="name"
      value="FEMININO"
    />
  </v-radio-group>
</template>
