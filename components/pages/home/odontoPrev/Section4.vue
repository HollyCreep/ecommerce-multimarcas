<script setup lang="ts">

</script>

<template>
  <section class="v-container">
    <v-container>
      <h2 class="text-primary mb-8">
        Planos para você e sua família
      </h2>
      <v-row>
        <v-col cols="4" class="d-flex flex-column">
          <div class="d-flex text-primary mb-4">
            <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3 mr-4" />
            <EnchantedText tag="h5" bold="Dental Júnior">
              {{ 'Dental Júnior\n de 8 a 16 anos' }}
            </EnchantedText>
          </div>
          <p class="mb-4">
            Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.
          </p>
          <v-btn color="secondary" class="rounded-lg">
            CONTRATE AGORA
          </v-btn>
        </v-col>
        <v-col cols="6">
          <PriceTag :value="27.99" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>

</style>
