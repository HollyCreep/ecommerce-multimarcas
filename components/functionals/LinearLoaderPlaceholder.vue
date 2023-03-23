<template>
  <v-row
    class="fill-height"
    align-content="center"
    justify="center"
  >
    <v-col
      class="text-subtitle-1 text-center"
      cols="12"
    >
      <slot>Buscando...</slot>
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
</template>
