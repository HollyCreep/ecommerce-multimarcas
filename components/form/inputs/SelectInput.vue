<script lang="ts" setup>
import type { PropType } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
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
  <v-select
    v-model="value"
    v-bind="$attrs"
    :items="items"
    :error-messages="errors"
    :label="label || name"
  />
</template>
