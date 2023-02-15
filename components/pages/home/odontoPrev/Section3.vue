<template>
  <v-container id="odp-home-section-3" tag="section" class="bg-primary-darken-2 py-16 mt-10">
    <div class="text-center text-md-left">
      <h2 class="text-primary-lighten-1 mb-6">
        A maior rede de atendimento do Brasil
      </h2>
      <EnchantedText bold="27 mil dentistas" class="mb-6">
        São mais de 27 mil dentistas de diversas especialidades para você escolher, de onde estiver. Nossa rede
        credenciada possui profissionais capacitados e experts em odontologia para proporcionar atendimento de
        qualidade.
      </EnchantedText>
      <v-row>
        <v-col cols="12" md="6" class="d-flex align-center">
          <Icon
            name="click" color="white" secondary-color="primary-lighten-1" width="64" height="64"
            class="mr-4 flex-shrink-0"
          />
          <EnchantedText tag="h3" bold="+ 2.600" class="text-primary-lighten-1">
            + 2.600 de municípios atendidos
          </EnchantedText>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center">
          <Icon
            name="user-group" color="white" secondary-color="primary-lighten-1" width="94"
            class="mr-4 flex-shrink-0"
          />
          <EnchantedText tag="h3" bold="+ 27.000" class="text-primary-lighten-1">
            + 27.000 de dentistas credenciados
          </EnchantedText>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
#odp-home-section-3 {
  position: relative;

  @media screen and (min-width: 600px) {
  > div {
      max-width: 50%;
      margin-right: auto;
    }

    &::after {
      content: '';
      position: absolute;
      width: 50%;
      height: calc(100% + 50px);
      bottom: 0;
      right: 0;
      background-size: contain;
      background-image: url(/images/odontoPrev/home/bg-1.png);
      background-position: right top;
    }
  }

}
</style>
