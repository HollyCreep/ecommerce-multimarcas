<template>
  <v-container id="odp-home-section-4" tag="section" class="d-flex justify-end align-center ">
    <div class="text-center text-md-left">
      <h2 class="text-primary font-weight-bold mb-8">
        Planos para você e sua família
      </h2>
      <v-row>
        <v-col cols="12" md="5" class="d-flex flex-column">
          <div class="d-flex text-primary mb-4 justify-center justify-md-start">
            <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3 mr-4" />
            <EnchantedText tag="h5" bold="Dental Júnior">
              {{ 'Dental Júnior\n de 8 a 16 anos' }}
            </EnchantedText>
          </div>
          <p class="mb-8">
            Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.
          </p>
          <v-btn min-width="210" color="secondary" class="rounded-lg ml-auto ml-md-0 mr-auto" size="large">
            CONTRATE AGORA
          </v-btn>
        </v-col>
        <v-col cols="12" md="auto">
          <PriceTag :value="27.99" tooltip="por apenas" class="ml-auto ml-md-0 mr-auto" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
#odp-home-section-4 {
  position: relative;
  min-height: 500px;

  @media screen and (min-width: 600px) {
    > div {
      max-width: 50%;
      margin-left: auto;
    }

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
  }
}
</style>
