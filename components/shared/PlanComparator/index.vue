<script setup lang="ts">
import Slider from './Slider.vue'
import Card from './Card.vue'
const { getFeaturedProducts } = useProductStore()
const state = ref({
  products: [],
})

const item1 = ref({
  produto: state.value.products[0],
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
const item2 = ref({
  produto: state.value.products[0],
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
})

onMounted(async () => {
  state.value.products = await getFeaturedProducts()
})
</script>

<template>
  <v-row>
    <v-col cols="12" md="3" order-md="last">
      <Slider :produtos="state.products" />
    </v-col>
    <v-col cols="4">
      <Card id="card-target" class="fill-height" v-bind="item1" variant="flat" color="red" />
    </v-col>
    <v-col cols="5" style="position: relative;">
      <Card class="fill-height active-card" v-bind="item2" color="red" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
$col-padding: 24px;
$container-padding: 64px;
    .active-card {
        transform: scaleY(1.125);
    }
</style>
