<script setup lang="ts">
import EmptyCart from '~~/components/cart/EmptyCart.vue'
const store = useCartStore()

const hasPlan = computed(() => !!store.state.titular.plan)
</script>

<template>
  <v-container>
    <div v-if="hasPlan">
      <h2 class="font-weight-bold text-primary">
        <Icon name="cart-fill" color="primary" />
        Resumo
      </h2>
      <FormLogin />
    </div>
    <EmptyCart v-else variant="flat" color="background" />
  </v-container>
</template>

<style scoped>

</style>
