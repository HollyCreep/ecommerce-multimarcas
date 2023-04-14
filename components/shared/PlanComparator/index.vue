<script setup lang="ts">
import Slider from './Slider.vue'
import ComparatorCard from './ComparatorCard.vue'
import type { IProduct } from '~~/types/product'
const { getFeaturedProducts } = useProductStore()
const state = ref({
  products: [],
})

const product = inject<IProduct>('product')
const compareProduct = ref<IProduct>(null)

const item1 = ref({
  produto: product,
  cobertura: {
    title: 'Cobertura',
    color: 'primary-lighten-1',
    items: ['Aplicação de Flúor e Selantes',
      'Extração de Dentes do Siso',
      'Consultas com Especialistas em Odontopediatria',
      'Restaurações',
      'Emergência 24h',
      'Limpezas Periódicas',
      'Cirurgia e Radiografias',
      'Próteses Simples (unitária)',
    ],
  },
  naoCobertura: {
    title: 'Não Coberto',
    icon: 'mdi-close-thick',
    items: [
      'Documentação e Radiografias Ortodônticas',
      'Colocação + Manutenção de Aparelho',
      'Placa de clareamento + Gel',
      'Prótese (completa)',
    ],
  },
})
const item2 = computed(() => ({
  produto: compareProduct.value,
  cobertura: {
    title: 'Cobertura',
    color: 'primary-lighten-1',
    items: ['Aplicação de Flúor e Selantes',
      'Extração de Dentes do Siso',
      'Consultas com Especialistas em Odontopediatria',
      'Restaurações',
      'Emergência 24h',
      'Limpezas Periódicas',
      'Cirurgia e Radiografias',
      'Próteses Simples (unitária)',
    ],
  },
  naoCobertura: {
    title: 'Não Coberto',
    icon: 'mdi-close-thick',
    color: 'primary-darken-2',
    items: [
      'Documentação e Radiografias Ortodônticas',
      'Colocação + Manutenção de Aparelho',
      'Placa de clareamento + Gel',
      'Prótese (completa)',
    ],
  },
}))

onMounted(async () => {
  state.value.products = await getFeaturedProducts()
})
</script>

<template>
  <v-row no-gutters>
    <v-col cols="12" md="3" order-md="last" class="pl-lg-4">
      <Slider :produtos="state.products" @update:selected-product="$event => compareProduct = $event" />
    </v-col>
    <v-col cols="12" md="5" order-md="2">
      <ComparatorCard v-if="compareProduct" active v-bind="item2" variant="flat" color="transparent" />
    </v-col>
    <v-col cols="12" md="4">
      <ComparatorCard id="card-target" v-bind="item1" variant="flat" color="transparent" />
    </v-col>
  </v-row>
</template>
