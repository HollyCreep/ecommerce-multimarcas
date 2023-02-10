<script setup lang="ts">
const items = [
  {
    src: '/images/odontoPrev/home/hero.png',
    content: {
      title: 'Planos dentais a partir de R$23,99*',
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
  <Hero id="odp-home-section-1" v-slot="{ item }: { item: typeof items[0] }" :items="items">
    <div style="max-width: 450px" class="text-white">
      <h1 class="mb-4 font-weight-bold">
        {{ item.content.title }}
      </h1>
      <p class="mb-4">
        {{ item.content.text }}
      </p>
      <p class="mb-4">
        {{ item.content.caption }}
      </p>
      <v-btn color="secondary" :href="item.action.href" size="x-large" class="rounded-lg">
        {{ item.action.text }}
      </v-btn>
    </div>
  </Hero>
</template>
