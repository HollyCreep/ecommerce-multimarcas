<template>
  <v-app>
    <v-container class="pa-0" fluid>
      <ThemedBanner sticky />
      <v-main>
        <slot />
      </v-main>
    </v-container>
    <Footer />
  </v-app>
</template>
