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
]
</script>

<template>
  <v-toolbar id="odp-header" color="transparent">
    <NuxtLink to="/">
      <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="200px" class="flex-shrink-0" />
    </NuxtLink>
    <v-spacer />
    <GroupLinks :items="menuItems" button-class="text-white" />
  </v-toolbar>
</template>

<style scoped>

</style>
