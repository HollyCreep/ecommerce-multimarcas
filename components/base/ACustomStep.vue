<script lang="ts" setup>
withDefaults(defineProps<{ state: boolean }>(), {
  state: false,
})
const valid = ref(false)
const isPanelActive = ref(false)
</script>

<template>
  <v-stepper-step
    class="odp-custom-step"
    :color="!!state ? 'success' : 'primary-darken'"
    editable
    :complete="!!state"
    complete-icon="mdi-check-circle"
    error-icon="mdi-alert-circle-outline"
    :edit-icon="!!state ? 'mdi-check' : 'pencil-outline'"
    :rules="[() => !(!state && state !== null)]"
    v-bind="$attrs"
  >
    <slot />
  </v-stepper-step>
</template>

<style lang="scss" scoped>
.odp-custom-step::v-deep {
  &.error--text {
    color: #fb8c00 !important;
  }
}
</style>
