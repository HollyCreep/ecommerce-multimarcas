<script setup lang="ts">
import { storeToRefs } from 'pinia'

defineProps<{ error: Object }>()
const store = useThemeStore()
const { activeBrand } = storeToRefs(store)
const items = [{ src: `/images/${activeBrand.value.name}/home/hero-1.png`, alt: '' }]

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <v-app>
    <Hero :items="items">
      <div
        class="w-100 text-center"
      >
        <h1 class="text-white font-weight-semi-bold mb-8">
          Página não existe ou não está mais disponível
        </h1>
        <v-btn
          class="primary--text font-weight-semi-bold"
          color="secondary"
          @click="handleError"
        >
          Voltar para home
        </v-btn>
      </div>
    </Hero>
    <Footer color="#F9FDFF" />
  </v-app>
</template>
