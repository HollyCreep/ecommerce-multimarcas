<template>
  <v-card v-bind="$attrs">
    <v-card-text class="d-flex flex-column align-center justify-center ">
      <Icon name="empty-cart" color="primary" width="150" :aspect-ratio="2 / 1" />
      <h3 class="my-4">
        Seu carrinho está vazio!
      </h3>
      <p class="w-75 text-caption text-center">
        Parece que você não adicionou nada ao seu carrinho ainda. Vá em frente e explore nossos produtos
      </p>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        color="primary" variant="flat" size="small" :to="{
          path: '/',
          hash: '#plans',
        }"
      >
        Retornar a loja
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
