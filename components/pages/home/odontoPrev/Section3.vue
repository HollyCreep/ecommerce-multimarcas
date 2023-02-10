<template>
  <section id="odp-home-section-3" class="bg-primary-darken-2 py-16">
    <v-container>
      <v-row>
        <v-col cols="8" lg="5">
          <h2 class="text-primary-lighten-1 mb-6">
            A maior rede de atendimento do Brasil
          </h2>
          <EnchantedText bold="27 mil dentistas" class="mb-6">
            São mais de 27 mil dentistas de diversas especialidades para você escolher, de onde estiver. Nossa rede
            credenciada possui profissionais capacitados e experts em odontologia para proporcionar atendimento de
            qualidade.
          </EnchantedText>
          <v-row>
            <v-col cols="6" class="d-flex align-center">
              <Icon
                name="click" color="white" secondary-color="primary-lighten-1" width="64" height="64"
                class="mr-4 flex-shrink-0"
              />
              <EnchantedText tag="h3" bold="+ 2.600" class="text-primary-lighten-1">
                + 2.600 de municípios atendidos
              </EnchantedText>
            </v-col>
            <v-col cols="6" class="d-flex align-center">
              <Icon
                name="user-group" color="white" secondary-color="primary-lighten-1" width="94"
                class="mr-4 flex-shrink-0"
              />
              <EnchantedText tag="h3" bold="+ 27.000" class="text-primary-lighten-1">
                + 27.000 de dentistas credenciados
              </EnchantedText>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
#odp-home-section-3 {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 120%;
    bottom: 0;
    right: 0;
    background-size: contain;
    background-image: url(/images/odontoPrev/home/bg-1.png);
    background-position: right top;
  }
}
</style>
