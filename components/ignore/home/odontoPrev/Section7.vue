<script setup lang="ts">
const logos = [
  'drogaria-sao-paulo',
  'drogaria-pacheco',
  'invisalign',
  'amigoo',
  'livelo',
  'picpay',
]
</script>

<template>
  <section id="clube-beneficios" class="container-fluid pb-16 bg-primary-darken-2 text-white">
    <div class="text-center text-md-left pt-8">
      <h2 class="font-weight-bold mb-6">
        Clube de benefícios Odontoprev
      </h2>
      <p class="mb-16" style="max-width: 600px">
        Aproveite as vantagens de ser cliente Odontoprev e utilize os benefícios como descontos em produtos entre
        outros.
        Temos diversos parceiros entre farmácias, planos odontológicos pet e tratamentos especiais como Invisalign*.
        Veja
        abaixo alguns de nossos parceiros.
      </p>

      <v-row class="mb-16">
        <v-col v-for="(logo, i) in logos" :key="i" cols="6" md="4" class="px-8 d-flex align-center">
          <v-img :src="`/images/odontoPrev/partners/${logo}.png`" contain max-width="200px" max-height="100px" />
        </v-col>
      </v-row>

      <v-btn class="text-primary" size="large" rounded="lg">
        Conheça os benefícios
      </v-btn>
    </div>
  </section>
</template>

<style lang="scss">
  $padding: 200px;

#clube-beneficios {
  overflow: hidden;
  padding-top: $padding;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: calc($padding * 2);
    top: 0;
    left: 0;
    background-color: #F9FDFF;
    border-radius: 100%;
    transform: translateY(-50%);
  }

  @media screen and (max-width: 600px) {
    padding-top: calc(#{$padding} / 2);
    &::before {
      height: $padding;
    }
  }

  @media screen and (min-width: 600px) {

    > div {
      max-width: 50%;
      margin-right: auto;
    }

    &::after {
      content: '';
      position: absolute;
      width: 40%;
      max-width: 750px;
      height: 100%;
      top: 0;
      right: 0;
      background-size: auto;
      background-position: left bottom;
      background-image: url(/images/odontoPrev/home/img-3.png);
    }
  }
}
</style>
