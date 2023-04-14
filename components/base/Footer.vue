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
  { text: 'Login', href: '' },
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
    <v-row :no-gutters="mdAndUp" align="end" class="pb-4 justify-center justify-md-space-between">
      <v-col cols="auto" order-md="last" offset-md="1" offset-lg="0">
        <v-card class="pa-8" rounded="lg" elevation="4" min-width="300">
          <h5 class="text-primary font-weight-bold mb-2">
            Receba novidades
          </h5>
          <v-text-field label="Seu email" variant="underlined" class="mb-2" />
          <v-btn color="secondary" variant="flat" rounded="md" block>
            Inscrever
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="7" lg="8" class="pb-4 border-opacity-100 border-primary-darken-2 border-b-md">
        <v-row align="end" justify="space-between" class="text-center text-md-left">
          <v-col cols="12">
            <NuxtLink to="/">
              <Icon name="logo-odontoPrev" color="white" secondary-color="white" width="260px" />
            </NuxtLink>

            <div class="d-flex mt-8">
              <GroupLinks :items="leftItems" vertical variant="text" size="x-small" button-class="text-caption font-noto-sans" class="border-e-md border-opacity-100 border-primary-darken-2 pr-4" :active="false" />

              <GroupLinks :items="rightItems" vertical variant="text" size="x-small" button-class="text-caption font-noto-sans" class="pl-4" :active="false" />
            </div>
          </v-col>
        </v-row>
        <v-row id="odp-footer-contacts" :no-gutters="mdAndUp" align="end" class="pb-4 justify-center justify-md-space-between">
          <v-col cols="12" md="8" class="pb-4 border-opacity-100 border-primary-darken-2 border-b-md mb-4 mb-md-0">
            <v-row :no-gutters="mdAndUp" align="end" justify="space-between" class="text-center text-md-left mt-4 mt-md-0">
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
          </v-col>
        </v-row>
        <v-row :no-gutters="mdAndUp">
          <v-col cols="12" class="d-flex flex-column flex-md-row align-center px-0">
            <v-img src="/images/odontoPrev/ans.png" width="155px" height="24px" class="flex-grow-0 mr-4" contain />
            <p class="text-caption">
              OdontoPrev - CRO/SP nº 2728 | RT J. M. Benozatti - CRO/SP nº 19009
            </p>
          </v-col>
          <v-col cols="12">
            <p>© Odontoprev. S/A / CNPJ: 58.119.199/0001-51 Alameda Araguaia, 2104 – 21º Andar – Alphaville – Barueri – SP - CEP 06455-000</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </footer>
</template>

<style lang="scss" scoped>
    #odp-footer {
      background-color: v-bind(waveColor);
      // padding-top: 64px;

      @media screen and (min-width: 600px) {
        background-image: url(assets/icons/wave.svg);
        background-size: cover;
        background-color: v-bind(backgroundColor);
        padding-top: 150px;
      }
    }
</style>
