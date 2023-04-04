<script setup lang="ts">
import { CART_ROUTES } from '~~/types/cart'
import type { IProduct } from '~~/types/product'

const store = useCartStore()
const product = await useProductStore().getProduct('2')

const handlePurshaseButton = (product: IProduct) => {
  store.addPlanoTitular(product)
  navigateTo(CART_ROUTES.carrinho)
}
</script>

<template>
  <section id="plano-destaque" class="container-fluid bg-background pt-16 pt-sm-0 pb-16">
    <v-row no-gutters justify="center">
      <v-col class="d-flex" cols="12" sm="4" lg="3">
        <v-img src="/images/odontoPrev/home/img-1.png" />
      </v-col>
      <v-col cols="12" sm="8" md="6" class="py-16">
        <h2 class="text-primary font-weight-bold mb-8 text-center">
          Planos para você e sua família
        </h2>
        <v-row class="justify-sm-center">
          <v-col cols="12" sm="5" lg="4" class="d-flex flex-column justify-md-space-evenly">
            <div class="d-flex text-primary mb-4 justify-center justify-sm-start">
              <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3 mr-4" />
              <EnchantedText tag="h5" bold="Dental Júnior">
                {{ 'Dental Júnior\n de 8 a 16 anos' }}
              </EnchantedText>
            </div>
            <p class="text-center text-sm-start">
              Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.
            </p>
          </v-col>
          <v-col cols="12" sm="auto">
            <PriceTag :value="27.99" tooltip="por apenas" class="ml-auto ml-md-0 mr-auto" />
          </v-col>
          <v-col cols="12" sm="8" lg="6" class="d-flex justify-center justify-sm-start">
            <v-btn min-width="210" color="secondary" class="rounded-lg" size="large" @click="handlePurshaseButton(product)">
              CONTRATE AGORA
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
#plano-destaque {
  :deep(.price-tag .integer) {
    line-height: .8;
  }
}
</style>
