<script setup lang="ts">
interface Props {
  pending?: boolean
  error?: any
}
defineProps<Props>()
</script>

<template>
  <v-fade-transition mode="out-in">
    <FunctionalsLinearLoader v-if="pending">
      <slot name="placeholder" />
    </FunctionalsLinearLoader>
    <h1 v-else-if="error" class="text-error">
      <slot name="error">
        Ops! Algo inesperado aconteceu ! {{ error }}
      </slot>
    </h1>
    <template v-else>
      <slot />
    </template>
  </v-fade-transition>
</template>
