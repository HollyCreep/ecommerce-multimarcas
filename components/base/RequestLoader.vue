<script setup lang="ts">
interface Props {
  pending?: boolean
  error?: any
}
defineProps<Props>()
</script>

<template>
  <v-fade-transition mode="out-in">
    <v-row
      v-if="pending"
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="text-subtitle-1 text-center"
        cols="12"
      >
        Carregando...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          rounded
          indeterminate
          color="primary"
          size="3rem"
          class="mx-auto d-block"
        />
      </v-col>
    </v-row>
    <h1 v-else-if="error" class="text-error">
      Ops! Algo inesperado aconteceu ! {{ error }}
    </h1>
    <template v-else>
      <slot />
    </template>
  </v-fade-transition>
</template>
