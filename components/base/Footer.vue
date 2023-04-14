<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'
import type { ISocialMedia } from '../shared/SocialMediaButtons.vue'

const props = withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'background',
})

const { mdAndUp } = useDisplay()
const { getColor } = useThemeController()
const waveColor = getColor('primary')
const backgroundColor = getColor(props.color)

const leftItems = [
  { text: 'Política de privacidade', href: 'https://www.odontoprev.com.br/portal-de-privacidade' },
  { text: 'Termos e condições', href: 'https://www.odontoprev.com.br/termos-de-uso' },
  { text: 'Seja nosso corretor', href: 'https://www.parceirosodontoprev.com.br/login' },
]

const rightItems = [
  { text: 'Por que comprar?', href: '' },
  { text: 'Encontre seu dentista', href: 'https://beneficiario.odontoprev.com.br/rede-credenciada' },
  { text: 'Conheça nossos planos', to: { path: '/', hash: '#plano-destaque' } },
  { text: 'Dúvidas', href: 'https://www.odontoprevonline.com.br/tire-suas-duvidas' },
  { text: 'Login', href: 'https://beneficiario.odontoprev.com.br' },
]

const socialMedia: ISocialMedia[] = [
  { svg: 'facebook', href: 'https://www.facebook.com/OdontoprevOficial' },
  { svg: 'linkedin', href: 'https://www.linkedin.com/company/odontoprev' },
  { svg: 'youtube', href: 'https://www.youtube.com/user/OdontoPrevOficial' },
  { svg: 'instagram', href: 'https://www.instagram.com/odontoprevoficial/?hl=en' },
]
</script>

<template>
  <footer id="odp-footer" class="text-white container-fluid md-inset pb-16">
    <div id="links">
      <NuxtLink to="/">
        <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="260px" />
      </NuxtLink>

      <div class="d-flex flex-column flex-md-row mt-8">
        <GroupLinks :items="leftItems" vertical variant="text" density="compact" button-class="text-caption font-noto-sans" :active="false" />
        <v-divider v-if="mdAndUp" vertical color="primary-darken-2" thickness="2px" class="border-opacity-100 mx-md-4" />
        <GroupLinks :items="rightItems" vertical variant="text" density="compact" button-class="text-caption font-noto-sans" :active="false" />
      </div>
    </div>

    <v-row id="contacts" :no-gutters="mdAndUp" align="end" justify="space-between" class="text-center text-md-left border-opacity-100 border-primary-darken-2 border-b-md pb-4">
      <v-col cols="12" md="auto">
        <p class="mb-2">
          Deficientes visuais
        </p>
        <v-btn color="primary-darken-2" class="mb-2" size="small">
          0800 722 2191
        </v-btn>
        <p>(24 horas 7 dias por semana)</p>
      </v-col>
      <v-col cols="12" md="auto">
        <SocialMediaButtons :items="socialMedia" size="50" color="primary-darken-2" secondary-color="white" />
      </v-col>
    </v-row>

    <div id="form" class="d-flex align-end justify-end">
      <v-card class="pa-8 w-100" rounded="lg" elevation="4" max-width="300">
        <h5 class="text-primary font-weight-bold mb-2">
          Receba novidades
        </h5>
        <v-text-field label="Seu email" variant="underlined" class="mb-2" />
        <v-btn color="secondary" variant="flat" rounded="md" block>
          Inscrever
        </v-btn>
      </v-card>
    </div>

    <div id="address">
      <div class="d-flex flex-column flex-md-row align-center mb-2">
        <v-img src="/images/odontoPrev/ans.png" width="155px" height="24px" class="flex-grow-0" contain />
        <p class="text-caption">
          OdontoPrev - CRO/SP nº 2728 | RT J. M. Benozatti - CRO/SP nº 19009
        </p>
      </div>
      <p>© Odontoprev. S/A / CNPJ: 58.119.199/0001-51 Alameda Araguaia, 2104 – 21º Andar – Alphaville – Barueri – SP - CEP 06455-000</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  #odp-footer {
    background-color: v-bind(waveColor);
    padding-top: 64px;
    display: grid;
    gap: 2rem;
    column-gap: 4rem;
    grid-template-areas:
      "links"
      "form"
      "contacts"
      "address";

    #links {
      grid-area: links;
    }

    #contacts {
      grid-area: contacts;
    }

    #form {
      grid-area: form;
    }

    #address {
      grid-area: address;
      > div {
        gap: 1rem;
      }
    }

    @media screen and (min-width: 600px) {
      background-image: url(assets/icons/wave.svg);
      background-size: cover;
      background-color: v-bind(backgroundColor);
      padding-top: 150px;

      grid-template-areas:
      "links  form"
      "contacts  form"
      "address address"
      ;
    }

  }
</style>
