<script lang="ts" setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import type { MaskaDetail } from 'maska'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  masked: {
    type: Boolean,
    default: false,
  },
})
const nameRef = toRef(props, 'name')
const { errors, handleChange, value } = useField(nameRef)
const formattedValue = ref('')

watch(value, () => {
  if (props.masked && formattedValue.value.length && !value.value)
    formattedValue.value = ''
})

const onMaska = ({ detail }: CustomEvent<MaskaDetail>) => {
  formattedValue.value = detail.masked
  handleChange(detail.unmasked)
}
</script>

<template>
  <v-text-field v-if="masked" :model-value="formattedValue" :error-messages="errors" v-bind="$attrs" :label="label || name" @maska="onMaska" />
  <v-text-field v-else v-model="value" :error-messages="errors" v-bind="$attrs" :label="label || name" />
</template>
