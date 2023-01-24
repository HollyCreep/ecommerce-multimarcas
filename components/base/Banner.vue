<script>
export default {
}
</script>

<template>
  <v-banner
    lines="one"
    color="primary"
    class=""
  >
    <template #prepend>
      <nuxt-icon color="primary" name="dente-brilho" size="54px" height="54px" />
    </template>

    <v-banner-text>
      <!-- <h2>
        <span class="text-secondary"> BLACKFRIDAY DENTAL</span>
        DESCONTOS DE ATÉ 20% E LIVRE DE CARÊNCIA
      </h2> -->
    </v-banner-text>

    <template #actions>
      <v-btn variant="outlined" color="secondary">
        Confira
      </v-btn>
    </template>
  </v-banner>
</template>

<style lang="scss" scoped>

</style>
