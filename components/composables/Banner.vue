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
    <v-container class="py-0 d-flex align-center">
      <Icon color="primary-lighten-1" secondary-color="white" name="dente-shining" width="54" />

      <v-banner-text>
        <EnchantedText tag="h2" color="secondary" highlight="BLACKFRIDAY DENTAL" bold="BLACKFRIDAY DENTAL" class="font-weight-light">
          BLACKFRIDAY DENTAL DESCONTOS DE ATÉ 20% E LIVRE DE CARÊNCIA
        </EnchantedText>
      </v-banner-text>

      <v-btn variant="outlined" color="secondary" min-width="180">
        Confira
      </v-btn>
    </v-container>
  </v-banner>
</template>

<style lang="scss" scoped>
.odp-custom-banner {
  z-index: 99;
  ::v-deep(.v-banner-actions) {
    align-self: unset !important;
  }

  .v-container {
    gap: 1rem;
  }

}
</style>
