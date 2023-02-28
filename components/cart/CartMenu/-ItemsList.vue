<script setup lang="ts">
const store = useCartStore()
</script>

<template>
  <v-card class="pa-4">
    <h5 class="text-primary mb-4 font-weigh-bold">
      Resumo do Pedido
    </h5>
    <ul class="cart-plans-list">
      <li v-for="(plan, i) in store.items" :key="i" class="text-primary">
        <v-btn
          color="primary"
          icon="mdi-delete"
          size="x-small"
          variant="plain"
          @click="plan.delete"
        />

        <div class="plan-main-content">
          <p class="text-caption">
            Plano
          </p>
          <p class="font-weight-bold text-caption">
            {{ plan.nomeFantasia }}
          </p>
        </div>

        <div class="plan-price text-right">
          <p>
            R$ {{ plan.valor }}
          </p>
          <p class="text-lowercase">
            {{ plan.tipoNegociacao }}
          </p>
        </div>
      </li>
    </ul>
    <v-card-actions class="border-t-md border-opacity-100 border-primary pa-4 mt-4">
      <v-btn
        color="secondary"
        block
        variant="flat"
        to="/carrinho"
      >
        FECHAR PEDIDO
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
ul.cart-plans-list {
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    .plan-main-content {
      flex: 1;
    }

    p {
      margin-bottom: unset;
      font-size: 12px;
      line-height: 14px;
      font-family: var(--heading-font-family) !important;
    }
  }
}
</style>
