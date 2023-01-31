<script setup lang="ts">

</script>

<template>
  <section class="v-container">
    <v-container>
      <h1 class="text-primary mb-8">
        Planos para você e sua família
      </h1>
      <v-row>
        <v-col cols="auto" class="d-flex">
          <div class="d-flex text-primary">
            <Icon name="controle" color="primary" secondary-color="primary-lighten-1" class="text-h3" />
            <EnchantedText tag="h5" bold="Dental Júnior">
              {{ 'Dental Júnior\n de 8 a 16 anos' }}
            </EnchantedText>
          </div>
          <p>Rol completo da ANS para que seu filho tenha a disposição nossa rede completa de dentistas.</p>
          <v-btn color="secondary" class="rounded-lg">
            CONTRATE AGORA
          </v-btn>
        </v-col>
        <v-col cols="auto" />
      </v-row>
      <PriceTag :value="9.99" />
    </v-container>
  </section>
</template>

<style scoped>

</style>
