<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Brands } from '~~/types/enums'

definePageMeta({
  name: 'Teste',
})
const themeController = useThemeController()
const store = useThemeStore()
const { getActiveBrand } = storeToRefs(store)

const auth = useAuthApi()
// const productsAPI = useProductsApi()

const { data: teste, error, pending } = await auth.login({
  username: 'mor_2314',
  password: '83r5^_',
})

const user = await auth.getUser()

// const products = await productsAPI.getProducts()
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
    <nuxt-icon name="dente-brilho" class="text-h1" />

    <div v-if="pending">
      {{ pending }}
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="teste && !pending" class="text-primary">
      {{ teste }}
    </div>
  </div>
</template>
