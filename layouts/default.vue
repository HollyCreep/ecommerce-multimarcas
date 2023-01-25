<template>
  <v-app>
    <v-container class="py-0">
      <Banner />
      <header>
        <h1 class="text-slate-200 text-xs">
          Default & Not Mobile Layout
        </h1>
      </header>
      <v-main>
        <slot />
      </v-main>
    </v-container>
  </v-app>
</template>
