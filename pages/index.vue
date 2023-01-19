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
    <h1>Thema: {{ getActiveBrand.name }}</h1>
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

    <v-card color="amber">
      <v-card color="amber">
        <h1>Teste: {{ getActiveBrand.resources }}</h1>
      </v-card>

      <v-card-text color="amber">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
        necessitatibus quaerat commodi, voluptatum, fuga quia repellendus
        adipisci assumenda corporis laborum ducimus. Voluptates quasi, libero
        cum quod ipsa vitae corrupti porro cumque, amet officia deserunt.
        Incidunt cum saepe delectus aperiam veniam distinctio expedita
        laboriosam iure totam quisquam! Possimus eveniet voluptate ipsum.
      </v-card-text>
    </v-card>
    <p class="text-primary">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, nisi modi.
      Et minima eius dignissimos omnis recusandae? Aliquid illo ipsa explicabo
      nisi itaque consequuntur sapiente exercitationem, beatae dolorem?
      Repudiandae, velit?
    </p>
  </div>
</template>
