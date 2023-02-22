<script setup lang="ts">
import { storeToRefs } from 'pinia'

export interface IBanner {
  color?: string
  text: string
  action: {
    text: string
    href: string
  }
}

const themeStore = useThemeStore()
const { activeBrand } = storeToRefs(themeStore)

const bannerProps = activeBrand.value.resources.components?.banner
</script>

<template>
  <v-banner
    v-if="bannerProps"
    lines="one"
    color="primary"
    class="odp-custom-banner px-0"
    :class="bannerProps.color || 'bg-primary'"
  >
    <v-container class="gap py-0 d-flex align-center">
      <Icon class="flex-shrink-0" color="primary-lighten-1" secondary-color="white" name="dente-shining" width="54" />

      <v-banner-text class="flex-grow-1 flex-shrink-1 px-0">
        <EnchantedText tag="h2" color="secondary" highlight="BLACKFRIDAY DENTAL" bold="BLACKFRIDAY DENTAL" class="text text-center font-weight-light">
          BLACKFRIDAY DENTAL DESCONTOS DE ATÉ 20% E LIVRE DE CARÊNCIA
        </EnchantedText>
      </v-banner-text>

      <div class="gap d-flex  justify-center align-center">
        <v-text-field hide-details variant="outlined" class="rounded-lg" label="Possui um Cupom?" style="min-width: 180px" />
        <v-btn color="primary" rounded="lg">
          APLICAR
        </v-btn>
      </div>
    </v-container>
  </v-banner>
</template>

<style lang="scss" scoped>
.odp-custom-banner {
  z-index: 99;

  .gap {
    gap: 1rem;
  }

  .text {
    font-size: clamp(20px, 1vw, 2rem) !important;
  }

}
</style>
