<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs'
import type { Link } from '~~/types'

const menuItems: Link[] = [
  {
    text: 'Por que comprar?',
    href: '',
    to: {
      path: '/',
      hash: '#quem-somos',
    },
  },
  {
    text: 'Conheça os planos',
    href: '',
    to: {
      path: '/',
      hash: '#plano-destaque',
    },
  },
  {
    text: 'Dúvidas',
    href: '',
  },
]

const { mdAndUp } = useDisplay()
</script>

<template>
  <v-toolbar id="odp-header" color="transparent">
    <NuxtLink to="/">
      <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="200px" class="flex-shrink-0" />
    </NuxtLink>
    <v-spacer />
    <v-fade-transition mode="out-in">
      <GroupLinks v-if="mdAndUp" :items="menuItems" :active="false" button-class="text-white" />
      <v-menu v-else>
        <template #activator="{ props }">
          <v-btn icon="mdi-menu" v-bind="props" color="white" />
        </template>

        <v-list>
          <v-list-item
            v-for="(item, n) in menuItems"
            :key="n"
            :href="item.href ?? undefined"
            :target="item.href ? '_blank' : ''"
            :to="item.to ?? undefined"
            :active="false"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-fade-transition>
  </v-toolbar>
</template>
