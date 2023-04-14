<script setup lang="ts">
const { buyProduct } = useProductStore()

const items = [
  {
    src: '/images/odontoPrev/home/hero-1.png',
    content: {
      title: 'Planos dentais a partir de R$23,99*',
      text: 'A maior rede credenciada do Brasil, cobertura odontológica completa, com a dedicação que você precisa para ter uma experiência fácil, leve e revigorante.',
      caption: '*Plano dente de leite',
    },
    action: {
      text: 'CONTRATE AGORA',
      to: {
        path: '/',
        hash: '#odp-home-section-5',
      },
    },
  },
  {
    src: '/images/odontoPrev/home/hero-2.png',
    content: {
      title: 'O melhor sorriso para momentos inesquecíveis!',
      text: 'Condições especiais de carência reduzida para seu plano Odontológico!',
      caption: '*30 dias para Clínica Geral e 90 para prótese',
    },
    action: {
      text: 'CONTRATE AGORA',
      to: {
        path: '/',
        hash: '#odp-home-section-5',
      },
    },
  },
  {
    src: '/images/odontoPrev/home/hero-3.png',
    content: {
      title: 'Vista-se do seu melhor sorriso.',
      text: 'Só esse mês você compra o plano Bem-estar e ganha clareamento dental!',
      caption: '*oportunidade valida apenas para o mês de abril 2023',
    },
    action: {
      text: 'CONTRATE AGORA',
      callback: () => buyProduct('1'),
    },
  },
]
</script>

<template>
  <Hero id="odp-home-section-1" v-slot="{ item }: { item: typeof items[0] }" :items="items">
    <div style="max-width: 450px" class="text-white">
      <h1 class="mb-4 font-weight-bold">
        {{ item.content.title }}
      </h1>
      <h6 class="mb-4 w-75">
        {{ item.content.text }}
      </h6>
      <p class="mb-8">
        {{ item.content.caption }}
      </p>
      <v-btn color="secondary" size="x-large" class="rounded-lg" :to="item.action.to" @click="item.action.callback">
        {{ item.action.text }}
      </v-btn>
    </div>
  </Hero>
</template>
