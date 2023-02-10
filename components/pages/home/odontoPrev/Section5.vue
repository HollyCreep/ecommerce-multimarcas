<script setup lang="ts">
const { getProducts } = useProductsApi()
</script>

<template>
  <section id="odp-home-section-5" class="pb-16 bg-background">
    <v-container>
      <h2 class="text-primary text-center font-weight-bold mb-16">
        Os melhores planos para você
      </h2>
      <RequestLoader v-slot="{ data }" :request="getProducts" :retry="3">
        <v-item-group selected-class="bg-primary">
          <v-row justify="space-between" no-gutters>
            <v-col v-for="(product, i) in data" :key="i" cols="12" md="auto">
              <v-item v-slot="{ selectedClass }">
                <ProductCard v-ripple :product="product" color="primary-lighten-1" :dark="i >= 2"
                  :class="[selectedClass]" />
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </RequestLoader>
    </v-container>
  </section>
</template>
