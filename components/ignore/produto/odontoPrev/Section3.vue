<script setup lang="ts">
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
</script>

<template>
  <section class="bg-primary-darken-1">
    <v-container>
      <v-timeline direction="horizontal" side="start" line-color="primary-lighten-1">
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
          <div class="text-center">
            <Icon filled :name="item.icon" color="white" secondary-color="primary-lighten-1" height="54px" />
            <h4 class="font-noto-sans" v-text="item.text" />
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
    :deep(.v-timeline) {
      .v-timeline-item {
        .v-timeline-item__body {
          align-self: center !important;
        }
        &:first-of-type .v-timeline-divider__dot {
          display: none;
        }
      }

    }
</style>
