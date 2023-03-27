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
  <section id="plano-destaque" class="container-fluid md-inset-right bg-background pb-10 d-flex justify-end align-center">
    <div class="text-center text-md-left mx-lg-auto ml-md-auto">
      <h2 class="text-primary font-weight-bold mb-8 text-lg-center">
        Planos para você e sua família
      </h2>
      <v-row class="justify-lg-center">
        <v-col cols="12" md="5" class="d-flex flex-column">
          <div class="d-flex text-primary mb-4 justify-center justify-md-start">
            <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3 mr-4" />
            <EnchantedText tag="h5" bold="Dental Júnior">
              {{ 'Dental Júnior\n de 8 a 16 anos' }}
            </EnchantedText>
          </div>
          <p class="mb-8">
            Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.
          </p>
          <v-btn min-width="210" color="secondary" class="rounded-lg ml-auto ml-md-0 mr-auto" size="large" @click="handlePurshaseButton(product)">
            CONTRATE AGORA
          </v-btn>
        </v-col>
        <v-col cols="12" md="auto">
          <PriceTag :value="27.99" tooltip="por apenas" class="ml-auto ml-md-0 mr-auto" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#plano-destaque {
    position: relative;
    min-height: 500px;

    @media screen and (min-width: 600px) {
      > div {
        width: 100%;
        max-width: 50%;
      }

      &::after {
        content: '';
        position: absolute;
        width: 40%;
        max-width: 600px;
        height: calc(100% + 35px);
        bottom: 0;
        left: 0;
        background-size: auto 100%;
        background-image: url(/images/odontoPrev/home/img-1.png);
        background-position: right top;

        @media screen and (min-width: 1264px) {
          width: 25%;
        }
      }
    }
    @media (min-width: 1264px) {
    &::before {
      padding-left: 200px;
    }
  }

}
</style>
