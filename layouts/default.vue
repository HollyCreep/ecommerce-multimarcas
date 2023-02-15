<template>
  <v-app>
    <v-container class="pa-0" fluid>
      <Banner sticky />
      <v-main>
        <slot />
      </v-main>
    </v-container>
    <Footer />
  </v-app>
</template>
