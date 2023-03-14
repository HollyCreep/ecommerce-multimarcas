<script setup lang="ts">
const model = ref(0)
</script>

<template>
  <section class="bg-primary">
    <v-container>
      <h2 class="font-weight-bold text-white mb-4">
        Você Sabia<span class="text-primary-lighten-1">?</span>
      </h2>
      <ul class="cards-list">
        <v-card v-for="i in 3" :key="i" class="bg-white">
          <v-img src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg" max-height="270" />

          <v-card-text>
            <div class="d-flex justify-space-between mb-4">
              <h6 class="text-uppercase text-primary font-weight-bold">
                bem-estar
              </h6>

              <v-icon icon="mdi-share" color="main" size="18" />
            </div>

            <h4 class="font-weight-bold text-main mb-1">
              Cáries: saiba mais!
            </h4>
            <p class="text-primary text-caption font-weight-bold font-soleto mb-2">
              14/04/2022
            </p>
            <v-card-subtitle class="px-0 mb-2" style="font-size: 16px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, a!
            </v-card-subtitle>
            <div class="d-flex justify-space-between align-center">
              <p class="font-soleto text-caption text-uppercase text-primary font-weight-bold">
                <v-icon icon="mdi-clock-outline" color="main" size="14" />
                14 min
              </p>

              <v-btn class="font-soleto font-weight-bold text-caption" variant="text" color="primary" append-icon="mdi-chevron-right">
                Leia mais
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="d-flex flex-column justify-space-around pa-8">
          <h2 class="text-white font-weight-bold">
            Gostou?
          </h2>
          <h2 class="text-primary-lighten-1 font-weight-bold">
            Tem muito mais no nosso Blog! :)
          </h2>
          <v-btn color="white" variant="text" class="px-0" density="compact">
            <EnchantedText tag="h4" class="font-soleto font-weight-bold">
              {{ `ver mais\n noticias` }}
            </EnchantedText>
            <template #append>
              <v-icon icon="mdi-chevron-right" size="48" />
            </template>
          </v-btn>
        </v-card>
      </ul>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
.cards-list {
  list-style: unset;
  display: flex;
  gap: 1rem;
  overflow: hidden;

  > div {
    // flex: 1 0;

    &:last-child {
      background-color: #003EA6;
      background-image: url(/images/odontoPrev/bg-coracao.png);
      background-size: cover;
      flex-basis: 300px;

      h2 {
        line-height: 2rem;
      }
    }
  }
}
</style>
