<script setup lang="ts">
import { CART_ROUTES } from '~~/types/cart'
import type { IPlan, IProduct } from '~~/types/product'

export interface IPlanCard {
  product: IProduct
  color?: string
  dark?: boolean
}

const props = withDefaults(defineProps<IPlanCard>(), {
  color: 'background',
})

const { getColor } = useThemeController()
const backgroundColor = getColor(props.dark ? 'primary' : props.color)
const textColor = props.dark ? 'text-white' : 'text-primary'
const inconPrimaryColor = props.dark ? 'white' : 'primary'
const inconSecondaryColor = props.dark ? getColor(props.color) : 'white'

const borderColor = props.product.mais_vendido ? getColor('secondary') : '#D1D1D1'

const plan = props.product.planos.find(p => p.tipoNegociacao === 'MENSAL') as IPlan

const store = useCartStore()

const handlePurshaseButton = (product: IProduct) => {
  store.addPlanoTitular(product)
  navigateTo(CART_ROUTES.carrinho)
}
</script>

<template>
  <v-card
    variant="outlined" min-height="100%" max-width="225" class="plan-card text-center bg-white"
    :class="{ 'most-valuable': product.mais_vendido }"
  >
    <div class="title d-flex flex-column align-center py-5" :class="textColor">
      <Icon
        :name="product.logo" :color="inconPrimaryColor" :secondary-color="inconSecondaryColor" class="mb-2"
        height="60"
      />
      <div>
        <EnchantedText tag="h3" class="font-weight-bold">
          {{ plan?.nomeFantasia }}
        </EnchantedText>
        <h3>{{ product.faxaEtaria }}</h3>
      </div>
    </div>
    <v-card-text class="pt-8 d-flex flex-column">
      <v-list density="compact" class="text-left mb-4 flex-grow-1">
        <v-list-item v-for="(item, index) in product.coberturas" :key="index" class="d-flex align-center">
          <template #prepend>
            <v-icon icon="mdi-check-bold" color="#707070" class="mr-2" />
          </template>
          <EnchantedText v-bind="item">
            {{ item.cobertura }}
          </EnchantedText>
        </v-list-item>
      </v-list>
      <a class="text-primary" href="https://www.google.com.br" style="font-size: 12px">Veja cobertura completa</a>
      <a class="text-primary" href="https://www.google.com.br" style="font-size: 12px">Condições gerais do plano</a>
      <v-btn color="primary" variant="outlined" rounded="lg" class="mt-4" :to="`/produtos/${product.sku}`" size="small">
        <p>Saiba mais</p>
      </v-btn>
      <v-divider class="my-4" />
      <PriceTag v-if="plan" :value="plan.valorTitular" class="mx-auto" />
      <v-hover
        v-slot="{ isHovering, props }"
      >
        <v-btn v-bind="props" color="secondary" :style="isHovering ? 'font-size: 20px' : ''" class="my-5" variant="flat" rounded="lg" :elevation="isHovering ? 24 : 0 " :size=" isHovering ? 'x-large' : 'large' " @click="handlePurshaseButton(product)">
          COMPRAR
        </v-btn>
      </v-hover>

      <p>
        Use em 90 dias para Clínico Geral e 180 dias para prótese.
      </p>
    </v-card-text>

    <span v-if="product.mais_vendido" class="badge">
      <v-icon icon="mdi-star" size="14px" />
      MAIS VENDIDO
    </span>
  </v-card>
</template>

<style lang="scss" scoped>
.plan-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  border-color: v-bind(borderColor);
  transform-style: preserve-3d;
  border-radius: 1rem;
  overflow: visible;

  &.most-valuable {
    border-width: 3px;
    position: relative;

    .badge {
      content: '';
      top: 0;
      left: 50%;
      transform: translate(-50%, -60%);
      position: absolute;
      background-color: v-bind(borderColor);
      border-radius: 5px;
      font-size: 18px;
      color: white;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      white-space: nowrap;
    }
  }

  .title {
    background-color: v-bind(backgroundColor);
    border-radius: 14px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    height: 200px;
  }

}
</style>
