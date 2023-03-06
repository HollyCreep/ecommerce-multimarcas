<script setup lang="ts">
const { fetchProducts } = useProductsApi()
</script>

<template>
  <section id="odp-home-section-5" class="pb-16 ">
    <v-container id="plans" class="px-0">
      <h2 class="text-primary text-center font-weight-bold mb-16">
        Os melhores planos para você
      </h2>
      <RequestLoader v-slot="{ data }" :request="fetchProducts" :retry="3">
        <v-slide-group center-active>
          <v-slide-group-item v-for="(product, i) in data" :key="i">
            <PlanCard
              v-ripple :product="product" color="primary-lighten-1" :dark="!!product.faxaEtaria"
              class="mx-2"
            />
          </v-slide-group-item>
        </v-slide-group>
      </RequestLoader>
    </v-container>
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
