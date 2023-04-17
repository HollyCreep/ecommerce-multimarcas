<script setup lang="ts">
const { fetchProducts } = useProductsApi()
const { pending, data: produtos, error, refresh } = await fetchProducts({ lazy: true })
</script>

<template>
  <section id="odp-home-section-5" class="pb-16 ">
    <div id="planos" class="px-0 container">
      <h2 class="text-primary text-center font-weight-bold mb-16">
        Os melhores planos para você
      </h2>
      <AsyncDataWrapper v-bind="{ pending, error }">
        <template #placeholder>
          Buscando planos
        </template>
        <template #error>
          <div class="text-center">
            <h6>Não foi possível buscar os planos.</h6>

            <v-btn color="secondary" @click="refresh">
              Tentar novamente
            </v-btn>
          </div>
        </template>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(product, i) in produtos" :key="i">
            <PlanCard
              v-ripple :product="product" color="primary-lighten-1" :dark="!!product.faxaEtaria"
              class="mx-2"
            />
          </v-slide-group-item>
        </v-slide-group>
      </AsyncDataWrapper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  #odp-home-section-5 {
    :deep(.v-slide-group__container) {
      padding-top: 1rem;

      .v-slide-group__content {
        justify-content: center;
      }
    }
  }
</style>
