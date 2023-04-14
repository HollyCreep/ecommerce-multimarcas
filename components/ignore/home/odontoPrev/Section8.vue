<script setup lang="ts">
const items = [
  {
    name: 'Amélia dos Santos, advogada',
    witness: 'Muitos dentistas disponíveis e facilidade no uso do plano',
    photo: '/images/odontoPrev/home/img-4.png',
  },
  {
    name: 'Cecília Prado Silva, marketing',
    witness: 'Muitos dentistas disponíveis e facilidade no uso do plano',
    photo: '/images/odontoPrev/home/img-5.png',
  },
]
</script>

<template>
  <section id="odp-home-section-8" class="container-fluid py-16">
    <h2 class="font-weight-bold text-primary text-center mb-10">
      Veja o que nossos clientes dizem sobre a Odontoprev
    </h2>
    <v-row justify="center">
      <v-col v-for="({ name, photo, witness }, i) in items" :key="i" cols="12" md="6" lg="5">
        <v-card variant="outlined" rounded="lg" class="pa-8 bg-white" color="border">
          <div class="d-flex flex-column flex-md-row align-center justify-space-between">
            <v-avatar
              class="mr-8"
              size="150"
              rounded="0"
            >
              <v-img :src="photo" />
            </v-avatar>
            <div>
              <div class="d-flex">
                <Icon name="quote-left" color="primary" class="text-h5 align-self-baseline" />
                <h3 class="text-center text-lg-start font-weight-bold text-primary px-2 py-3" v-text="witness" />
                <Icon name="quote-right" color="primary" class="text-h5  align-self-end" />
              </div>
              <p class="text-right text-subtitle-2 mt-2 text-main font-noto-sans" v-text="name" />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="secondary" size="large" rounded="lg" class="mx-auto d-block mt-8">
      DEIXE SEU TESTEMUNHO
    </v-btn>
  </section>
</template>

<style lang="scss" scoped>
#odp-home-section-8 {
  background-color: #F4F4F6;
}
</style>
