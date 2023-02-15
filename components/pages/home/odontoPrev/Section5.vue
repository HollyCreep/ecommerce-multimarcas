<script setup lang="ts">
const { getProducts } = useProductsApi()
</script>

<template>
  <section id="odp-home-section-5" class="pb-16 ">
    <v-container>
      <h2 class="text-primary text-center font-weight-bold mb-16">
        Os melhores planos para você
      </h2>
      <RequestLoader v-slot="{ data }" :request="getProducts" :retry="3">
        <v-slide-group selected-class="bg-primary" center-active>
          <v-slide-group-item v-for="(product, i) in data" v-slot="{ selectedClass, toggle }" :key="i">
            <ProductCard
              v-ripple :product="product" color="primary-lighten-1" :dark="i >= 2"
              class="mx-2" :class="[selectedClass]"
              @click="toggle"
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
    }
  }
</style>
