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
  <v-toolbar id="odp-header" color="transparent">
    <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="200px" class="flex-shrink-0" />
    <v-spacer />
    <GroupLinks :items="menuItems" button-class="text-white">
      <template #append>
        <v-slide-group-item>
          <CartMenu />
        </v-slide-group-item>
      </template>
    </GroupLinks>
  </v-toolbar>
</template>

<style scoped>

</style>
