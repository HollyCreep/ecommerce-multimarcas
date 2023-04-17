<template>
  <section id="odp-home-section-3" class="container-fluid">
    <v-row no-gutters justify="center">
      <v-col class="py-16 py-md-0 px-8 px-md-0 d-flex align-center" cols="12" lg="5" sm="7">
        <div class="text-center text-md-left">
          <h2 class="text-primary-lighten-1 mb-6">
            A maior rede de atendimento do Brasil
          </h2>
          <EnchantedText bold="27 mil dentistas" class="mb-6 text-white">
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
      </v-col>
      <v-col cols="12" sm="5" lg="4">
        <v-img src="/images/odontoPrev/home/bg-1.png" class="fill-height" min-height="300px" cover />
      </v-col>
    </v-row>
  </section>
</template>

<style lang="scss" scoped>
#odp-home-section-3 {
  position: relative;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: calc(100% - 2vw);
    background-color: #003EA6;
    bottom: 0;
    left: 0;
    transform: translateZ(-1px);
  }

  // MD only
  @media screen and (min-width: 960px) and (max-width: 1264px) {
    padding-right: 0;

  }

  // SM and down
  @media screen and (max-width: 960px) {
    padding: 0;

    :deep(.v-img .v-img__img) {
      object-fit: fill !important;
    }
  }
  :deep(.v-img .v-img__img) {
    object-position: left;
  }
}
</style>
