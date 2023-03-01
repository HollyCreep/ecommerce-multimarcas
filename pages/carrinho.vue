<script setup lang="ts">
const store = useCartStore()
const hasPlan = computed(() => !!store.state.titular.product)
</script>

<template>
  <div id="odp-cart">
    <v-container v-if="hasPlan" class="px-0">
      <v-row>
        <v-col cols="6">
          <NuxtPage />
        </v-col>
      </v-row>
    </v-container>
    <CartEmptyCart v-else variant="flat" color="background" />
  </div>
</template>

<style lang="scss" scoped>
  #odp-cart {
    background-image: url(/images/odontoPrev/bg-coracao.png);
    background-size: 500px 800px;
    background-position: top right;
    min-height: 800px;
    }
</style>
