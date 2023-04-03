<script setup lang="ts">
const { fetchProducts } = useProductsApi()
const { pending, data, error } = await fetchProducts({ lazy: true })
</script>

<template>
  <section id="planos" class="pb-16 ">
    <div id="plans" class="px-0 container">
      <h2 class="text-primary text-center font-weight-bold mb-16">
        Os melhores planos para você
      </h2>
      <AyncDataWrapper v-bind="{ pending, error }">
        <template #placeholder>
          Buscando planos
        </template>
        <v-slide-group center-active>
          <v-slide-group-item v-for="(product, i) in data" :key="i">
            <PlanCard
              v-ripple :product="product" color="primary-lighten-1" :dark="!!product.faxaEtaria"
              class="mx-2"
            />
          </v-slide-group-item>
        </v-slide-group>
      </AyncDataWrapper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  #planos {
    :deep(.v-slide-group__container) {
      padding-top: 1rem;

      .v-slide-group__content {
        justify-content: center;
      }
    }
  }
</style>
