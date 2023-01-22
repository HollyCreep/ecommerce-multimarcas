<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Brands } from '~~/types/enums'

definePageMeta({
  name: 'Teste',
})
const themeController = useThemeController()
const store = useThemeStore()
const { getActiveBrand } = storeToRefs(store)
</script>

<template>
  <div>
    <h1 class="text-primary">
      Thema: {{ getActiveBrand.name }}
    </h1>
    <v-icon
      color="red"
      icon="mdi-delete"
      @click="themeController.toggleTheme(Brands.ODONTO_PREV)"
    />
    <v-icon
      color="primary"
      @click="themeController.toggleTheme(Brands.ODONTO_SYSTEM)"
    >
      mdi-alert-circle-check
    </v-icon>
    <v-btn color="success" nuxt to="/carrinho">
      Pagina do carrinho
    </v-btn>
    <nuxt-icon name="dente-brilho" class="text-h1" />
  </div>
</template>
