<template>
  <section id="odp-home-section-4" class="d-flex justify-end align-center bg-background">
    <div class="container">
      <h2 class="text-primary font-weight-bold mb-8">
        Planos para você e sua família
      </h2>
      <v-row justify="end">
        <v-col cols="6" class="d-flex flex-column">
          <div class="d-flex text-primary mb-4">
            <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3 mr-4" />
            <EnchantedText tag="h5" bold="Dental Júnior">
              {{ 'Dental Júnior\n de 8 a 16 anos' }}
            </EnchantedText>
          </div>
          <p class="mb-4">
            Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.
          </p>
          <v-btn color="secondary" class="rounded-lg mr-auto" size="large">
            CONTRATE AGORA
          </v-btn>
        </v-col>
        <v-col cols="6">
          <PriceTag :value="27.99" />
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#odp-home-section-4 {
  position: relative;
  min-height: 500px;

  &::after {
    content: '';
    position: absolute;
    width: 40%;
    max-width: 600px;
    height: calc(100% + 35px);
    bottom: 0;
    left: 0;
    background-size: 100% 100%;
    background-image: url(/images/odontoPrev/home/img-1.png);
    background-position: left top;
  }

  .container {
    width: 50%;
    margin: 0 5%;

    @media screen and (min-width: 1264px) {
      width: 55%;
    }
  }
}
</style>
