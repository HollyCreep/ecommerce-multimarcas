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
  type: 'checkbox',
  checkedValue: true,
})
</script>

<template>
  <v-checkbox
    v-model="value"
    v-bind="$attrs"
    :error-messages="errors"
    type="checkbox"
  >
    <template #label>
      <slot>{{ label || name }}</slot>
    </template>
  </v-checkbox>
</template>

<style lang="scss" scoped>
  :deep(.v-selection-control__wrapper) {
    width: 24px;
    padding-right: 8px;
  }
</style>
