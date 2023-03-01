<script setup lang="ts">
const store = useCartStore()
const { getColor } = useThemeController()
const primaryColor = getColor('primary')
</script>

<template>
  <v-btn-toggle
    v-model="store.state.selectedPeriodType"
    class="border border-border border-opacity-100"
    selected-class="elevation-4"
    density="comfortable"
    mandatory
  >
    <v-btn value="MENSAL" width="115">
      Mensal
    </v-btn>
    <v-btn value="ANUAL" width="115">
      Anual
    </v-btn>
  </v-btn-toggle>
</template>

<style lang="scss" scoped>
  :deep(.v-btn) {
    background-color: #E8E9EC;
    color: #BABABA;
    font-size: 14px !important;

    &.v-btn--active {
      background-color: v-bind(primaryColor);
      color: white;
      span.v-btn__overlay {
        opacity: 0;
      }
    }
  }
</style>
