<script setup lang="ts">
import type { IProduct } from '~~/types/product'

const product = inject<IProduct>('product')

const items = [
  {
    src: '/images/odontoPrev/produtos/hero.png',
    content: {
      title: '',
      text: 'A maior rede credenciada do Brasil, cobertura odontológica completa, com a dedicação que você precisa para ter uma experiência fácil, leve e revigorante.',
      caption: '*Plano dente de leite',
    },
    action: {
      text: 'CONTRATE AGORA',
      href: '',
    },
  },
]
</script>

<template>
  <Hero id="inicio" v-slot="{ item }: { item: typeof items[0] }" :items="items">
    <div style="max-width: 40%" class="text-white d-flex flex-column">
      <Icon :name="product.logo" color="white" secondary-color="primary-lighten-1" class="text-h1 mx-auto" />
      <h1 class="mb-4 font-weight-bold text-primary-lighten-1 text-uppercase">
        {{ product.nome }}
      </h1>
      <p class="mb-4 w-75">
        {{ item.content.text }}
      </p>
      <p class="mb-8">
        {{ item.content.caption }}
      </p>
      <v-btn color="secondary" :href="item.action.href" size="x-large" class="rounded-lg">
        {{ item.action.text }}
      </v-btn>
    </div>
  </Hero>
</template>
