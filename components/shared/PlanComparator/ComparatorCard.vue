<script setup lang="ts">
import type { IFieldSetCard } from '../FieldSetCard.vue'
import type { IProduct } from '~~/types/product'
import { CART_ROUTES } from '~~/types/cart'

const props = defineProps<{ produto: IProduct; cobertura: IFieldSetCard; naoCobertura: IFieldSetCard; active?: boolean }>()

const { getColor } = useThemeController()
const color = getColor('primary')

const precoTitular = props.produto.planos.find(p => p.tipoNegociacao === 'MENSAL')?.valorTitular

const store = useCartStore()
const handlePurshaseButton = () => {
  store.addPlanoTitular(props.produto)
  navigateTo(CART_ROUTES.carrinho)
}
</script>

<template>
  <div class="pa-8 fill-height" :class="{ active: !!active }">
    <v-scale-transition mode="out-in" origin="bottom center">
      <div :key="produto.sku" class="d-flex flex-column fill-height">
        <div class="d-flex align-center mb-8">
          <Icon :name="produto.logo" color="white" secondary-color="primary-lighten-1" class="text-h3 mr-3" />
          <h3 class="text-white font-weight-bold">
            {{ produto.nome }}
          </h3>
        </div>
        <p class="mb-6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, quos.
        </p>

        <div class="flex-grow-1">
          <FieldSetCard v-bind="cobertura" class="mb-4" />
          <FieldSetCard v-bind="naoCobertura" />
        </div>

        <div class="d-flex justify-space-around mt-4">
          <PriceTag :value="precoTitular" size="small" text-color="text-primary-lighten-1">
            <template #append>
              <span class="text-white">débito em conta / cartão</span>
            </template>
          </PriceTag>
          <PriceTag :value="precoTitular" size="small" text-color="text-primary-lighten-1">
            <template #append>
              <span class="text-white">débito em conta / cartão</span>
            </template>
          </PriceTag>
        </div>

        <v-btn color="secondary" variant="flat" size="large" class="ml-auto mt-8 d-block " @click="handlePurshaseButton">
          CONTRATE AGORA
        </v-btn>
      </div>
    </v-scale-transition>
  </div>
</template>

<style lang="scss" scoped>
$extra-spacing: 16px;
$container-padding: 32px;
.active {
  position: relative;
  overflow: visible;
  transform-style: preserve-3d;

    &::before {
      position: absolute;
      content: '';
      top: calc(-1 * (#{$container-padding} + #{$extra-spacing}));
      left: 0;
      background-color: v-bind(color);
      border-radius: 8px;
      width: 100%;
      height: calc( 100% + (#{$container-padding} * 2) + (#{$extra-spacing} * 2));
      box-shadow: 0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 8px 10px 1px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 3px 14px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
      transform: translateZ(-1px);

      @media screen and (max-width: 600px) {
        top: 0;
        height: 100%;
      }
    }
}
</style>
