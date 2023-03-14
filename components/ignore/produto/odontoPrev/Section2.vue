<script lang="ts" setup>
import type { IFieldSetCard } from '~~/components/shared/FieldSetCard.vue'
import type { IProduct } from '~~/types/product'
const product = inject<IProduct>('product')

const cards: IFieldSetCard[] = [
  {
    title: 'Cobertura',
    color: 'primary-lighten-1',
    columns: 2,
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
  {
    title: 'Não Coberto',
    icon: 'mdi-close-thick',
    items: [
      'Documentação e Radiografias Ortodônticas',
      'Colocação + Manutenção de Aparelho',
      'Placa de clareamento + Gel',
      'Prótese (completa)',
    ],
  },
]
</script>

<template>
  <section id="odp-produtos-section-2" class="container-fluid py-8">
    <v-row>
      <v-col class="d-flex flex-column">
        <v-avatar size="70" color="primary-darken-2" class="mx-auto mb-6" />
        <h5 class="text-primary font-noto-sans font-weight-bold">
          Sobre o {{ product.nome }}
        </h5>
        <p>
          Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Corrupti harum necessitatibus quasi sed minima sunt asperiores,
          nam voluptatem dolore sapiente quam nesciunt adipisci? Provident,
          dicta.
        </p>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-avatar size="70" color="primary-darken-2" class="mx-auto mb-6" />
        <h5 class="text-primary font-noto-sans font-weight-bold">
          Para quem é indicado ?
        </h5>
        <p>
          Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Corrupti harum necessitatibus quasi sed minima sunt asperiores,
          nam voluptatem dolore sapiente quam nesciunt adipisci? Provident,
          dicta.
        </p>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-avatar size="70" color="primary-darken-2" class="mx-auto mb-6" />
        <h5 class="text-primary font-noto-sans font-weight-bold">
          Vantagens
        </h5>
        <p>
          Lorem,
          ipsum dolor sit amet consectetur adipisicing elit. Corrupti harum necessitatibus quasi sed minima sunt asperiores,
          nam voluptatem dolore sapiente quam nesciunt adipisci? Provident,
          dicta.
        </p>
      </v-col>
    </v-row>

    <h2 class="text-primary font-weight-bold my-8">
      Informações do Plano
    </h2>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index" cols="12" :md="index === 0 ? '8' : '4'">
        <FieldSetCard class="fill-height text-main" v-bind="card" />
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
  #odp-produtos-section-2 {
    background-image: url(/images/odontoPrev/produtos/bg.png);
    background-size: cover;
  }
</style>
