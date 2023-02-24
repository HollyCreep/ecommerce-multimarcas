<script setup>
import { toRef } from 'vue'
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
const { errors, value } = useField(nameRef)
</script>

<template>
  <v-text-field v-model="value" :error-messages="errors" v-bind="$attrs" :label="label || name" />
</template>
