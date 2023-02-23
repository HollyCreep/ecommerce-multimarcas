<script setup lang="ts">
import EmptyCart from './EmptyCart.vue'
import ItemsList from './ItemsList.vue'

const menu = ref(false)
const store = useCartStore()
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="end"
  >
    <template #activator="{ props }">
      <v-btn icon color="white" v-bind="props">
        <v-badge v-if="store.count" :content="store.count" color="secondary">
          <v-icon icon="mdi-cart-outline" color="white" />
        </v-badge>
        <v-icon v-else icon="mdi-cart-outline" color="white" />
      </v-btn>
    </template>

    <component :is="store.count ? ItemsList : EmptyCart" />
  </v-menu>
</template>
