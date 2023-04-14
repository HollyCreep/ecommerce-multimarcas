<script setup lang="ts">
import type { ISocialMedia } from '~/components/shared/SocialMediaButtons.vue'
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

const socialMedia: ISocialMedia[] = [
  { svg: 'facebook', href: 'https://www.facebook.com/OdontoprevOficial' },
  { svg: 'linkedin', href: 'https://www.linkedin.com/company/odontoprev' },
  { svg: 'youtube', href: 'https://www.youtube.com/user/OdontoPrevOficial' },
  { svg: 'instagram', href: 'https://www.instagram.com/odontoprevoficial/?hl=en' },
]
</script>

<template>
  <Hero id="odp-home-section-1" v-slot="{ item }: { item: typeof items[0] }" :items="items">
    <div class="content text-white w-100">
      <div class="mx-auto">
        <Icon :name="product.logo" color="white" secondary-color="primary-lighten-1" class="text-h1 mb-4 d-block w-75 text-center" />
        <h1 class="mb-4 font-weight-bold text-primary-lighten-1 text-uppercase">
          {{ product.nome }}
        </h1>
        <h3 class="mb-4">
          {{ item.content.text }}
        </h3>
        <p class="mb-8">
          {{ item.content.caption }}
        </p>
        <div class="social">
          <SocialMediaButtons :items="socialMedia" label="Compartilhe" variant="text" size="36" color="primary-darken-2" secondary-color="white">
            <template #label>
              <h5 class="mr-4">
                Compartilhe
              </h5>
            </template>
          </SocialMediaButtons>
        </div>
      </div>
    </div>
  </Hero>
</template>

<style lang="scss" scoped>
.content {
    @media screen and (min-width: 600px) {
      max-width: 40%;

      > div {
        max-width: 500px;
        width: 75%;
      }
    }
  }
  .social {
    position: relative;
    width: fit-content;
    padding-right: 2rem;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200vw;
      height: 100%;
      background-color: #003EA6;
      z-index: -1;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
</style>
