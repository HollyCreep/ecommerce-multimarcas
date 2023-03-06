<script setup lang="ts">
const store = useCartStore()
</script>

<template>
  <v-card max-width="460" variant="flat" color="background">
    <h2 class="text-primary font-weight-bold mb-6">
      <Icon name="cart-fill" color="primary" secondary-color="primary-lighten-1" />
      Resumo do pedido
    </h2>
    <div class="mb-10">
      <CartPlanPeriodSwitcher class="mb-8" />
      <CartFeaturedPlanCard v-for="{ plan } in store.items" :key="plan.codigoPlano" :plan="plan" class="mb-6" dark />
      <div class="text-right">
        <v-btn color="secondary" variant="flat" size="large" width="188" to="carrinho/titular">
          Comprar
        </v-btn>
      </div>
    </div>
    <h2 class="font-weight-bold text-primary">
      <Icon name="cart-fill" color="primary" />
      Resumo
    </h2>
    <FormLogin />
  </v-card>
</template>
