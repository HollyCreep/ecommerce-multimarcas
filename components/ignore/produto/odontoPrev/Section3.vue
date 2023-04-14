<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs'

const items = [
  {
    icon: 'med-kit',
    text: 'Lorem ipsum dolor',
    term: '24 horas',
  },
  {
    icon: 'dente-shining',
    text: 'Lorem ipsum dolor',
    term: '30 dias',
  },
  {
    icon: 'dente-aparelho',
    text: 'Lorem ipsum dolor',
    term: '60 dias  ',
  },
  {
    icon: 'dente-fio-dental',
    text: 'Lorem ipsum dolor',
    term: '90 dias',
  },
]

const { mdAndUp } = useDisplay()
</script>

<template>
  <section class="bg-primary-darken-1 container-fluid py-8">
    <v-timeline :direction="mdAndUp ? 'horizontal' : 'vertical'" :side="mdAndUp ? 'start' : 'end'" line-color="primary-lighten-1">
      <v-timeline-item>
        <EnchantedText tag="h2" class="font-weight-bold">
          {{ 'Carência\n Reduzida!' }}
        </EnchantedText>
        <h3 class="font-noto-sans">
          Até 31/01
        </h3>
      </v-timeline-item>
      <v-timeline-item v-for="(item, i) in items" :key="i" dot-color="primary-darken-1" size="x-small">
        <template #opposite>
          <h4 class="font-weight-bold font-noto-sans" v-text="item.term" />
        </template>
        <div class="text-center w-100">
          <Icon filled :name="item.icon" color="white" secondary-color="primary-lighten-1" height="54px" />
          <h4 class="font-noto-sans" v-text="item.text" />
        </div>
      </v-timeline-item>
    </v-timeline>
  </section>
</template>

<style lang="scss" scoped>
  section {
    overflow: hidden;

    :deep(.v-timeline) {
      .v-timeline-item {
        .v-timeline-item__body {
          align-self: center !important;

          @media screen and (max-width: 600px) {
            padding-inline-start: 24px !important;
            padding-inline-end: 24px !important;
          }
        }
        &:first-of-type .v-timeline-divider__dot {
          display: none;
        }

        @media screen and (min-width: 960px) {
          &:last-of-type .v-timeline-divider__after {
            position: relative;

            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: 100%;
              top: 50%;
              background-color: inherit;
              z-index: 1;
              width: 200%;
              height: 100%;
              transform: translateY(-50%);
            }
          }

        }

      }

    }
  }
</style>
