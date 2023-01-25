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
    class="odp-custom-banner align-center justify-center"
    :class="bannerProps.color || 'bg-primary'"
  >
    <template #prepend>
      <Icon color="primary-lighten-1" secondary-color="white" name="dente-shining" class="text-h3" />
    </template>

    <v-banner-text>
      <EnchantedText tag="h2" color="secondary" highlight="BLACKFRIDAY DENTAL" bold="BLACKFRIDAY DENTAL" class="font-weight-regular">
        {{ `BLACKFRIDAY DENTAL DESCONTOS DE ATÉ 20% E LIVRE DE CARÊNCIA` }}
      </EnchantedText>
    </v-banner-text>

    <template #actions>
      <v-btn variant="outlined" color="secondary">
        Confira
      </v-btn>
    </template>
  </v-banner>
  <h1>{{ activeBrand.resources }}</h1>
</template>

<style lang="scss" scoped>
.odp-custom-banner {
  ::v-deep(.v-banner-actions) {
    align-self: unset !important;
  }

}
</style>
