<script setup lang="ts">
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

    <v-card min-width="300" class="pa-4">
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

        <v-card-actions class="border-t-md border-opacity-100 border-primary pa-4 mt-4">
          <v-btn
            color="secondary"
            block
            variant="flat"
            @click="menu = false"
          >
            FECHAR PEDIDO
          </v-btn>
        </v-card-actions>
      </ul>
    </v-card>
  </v-menu>
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
