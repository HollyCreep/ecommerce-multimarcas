<script lang="ts" setup>
const items = [
  {
    text: 'Você e sua família toda\n com a saúde bucal em dia',
    icon: 'care',
  },
  {
    text: 'Precisa de clareamento?\n Temos planos disponíveis',
    icon: 'dente-shining',
  },
  {
    text: 'Acesso fácil com o app\n disponível nas lojas',
    icon: 'cellphone',
  },
  {
    text: 'O plano odontológico mais\n premiado entre os planos\n nacionais',
    icon: 'prize-check',
  },
]
</script>

<template>
  <section id="odp-home-section-6" class="container">
    <h2 class="text-primary font-weight-bold text-center mb-6">
      A importância de um plano dental
    </h2>
    <p class="text-center mx-auto mb-8" style="max-width: 700px">
      Ter o plano odontológico, portanto, ajuda a manter a saúde da boca sempre em dia. Com isso, o trabalhador se
      ausenta menos das suas funções por dor de dente ou atestado odontológico, além de executá-las com mais
      segurança e autoestima.
    </p>

    <ul class="container">
      <li v-for="({ text, icon }, index) in items" :key="index" class="text-main" :class="`content${index + 1}`">
        <EnchantedText tag="h5">
          {{ text }}
        </EnchantedText>
        <Icon width="48" color="primary" secondary-color="primary-lighten-1" :name="icon" />
      </li>
      <v-img src="/images/odontoPrev/home/img-2.png" class="img" />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
#odp-home-section-6 {

  .container {
    display: grid;
    column-gap: 4rem;
    grid-template-areas:
      "content1 img img content2"
      "content3 img img content4";
    list-style: none;

    @media screen and (min-width: 1264px) {
      grid-template-areas:
        "content1 img content2"
        "content3 img content4";
    }

    @media (max-width: 600px) {
      grid-template-areas:
        "content1"
        "content2"
        "img"
        "content3"
        "content4";
    }

    .content1 {
      grid-area: content1;
    }

    .content2 {
      grid-area: content2;
    }

    .content3 {
      grid-area: content3;
    }

    .content4 {
      grid-area: content4;
    }

    .img {
      grid-area: img;
    }

    >li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 8px;

      &:nth-child(odd) {
        justify-content: flex-end;
      }

      &:nth-child(even) {
        span {
          order: 1
        }

        h5 {
          order: 2
        }
      }
    }
  }
}
</style>
