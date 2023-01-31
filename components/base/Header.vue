<script setup lang="ts">
import type { Link } from '~~/types'

const menuItems: Link[] = [
  {
    text: 'Porque comprar?',
    href: '',
  },
  {
    text: 'Conheça dos planos',
    href: '',
  },
  {
    text: 'Dúvidas',
    href: '',
  },
  {
    text: 'Login',
    href: '',
  },
]
</script>

<template>
  <v-layout class="row justify-space-between align-center">
    <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="200px" class="flex-shrink-0" />
    <GroupLinks :items="menuItems" button-class="text-white">
      <template #append>
        <v-slide-group-item>
          <v-btn variant="text" icon color="white">
            <v-icon icon="mdi-cart-outline" color="white" />
          </v-btn>
        </v-slide-group-item>
      </template>
    </GroupLinks>
  </v-layout>
</template>

<style scoped>

</style>
