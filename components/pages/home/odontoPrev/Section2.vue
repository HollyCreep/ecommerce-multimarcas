<script setup lang="ts">
const items = [
  {
    text: 'Ampla \natuação\n nacional',
    icon: 'pin',
    bold: 'nacional',
  },
  {
    text: '+ de 35 anos\n de história em\n odontologia',
    icon: 'help',
    bold: '+ de 35 anos',
  },
  {
    text: '+ 8 milhões\n de sorrisos\n sob nossos\n cuidados',
    icon: 'diamante',
    bold: '+ 8 milhões',
  },
]
</script>

<template>
  <v-container class="text-center py-16">
    <h2 class="mb-8 mx-auto text-primary" style="max-width: 500px">
      Odontoprev, a mais completa solução odontológica.
    </h2>
    <p class="mb-16 mx-auto" style="max-width: 800px">
      Somos uma plataforma de cuidado e queremos te proporcionar liberdade de escolha em atendimento odontológico de qualidade. Nossos planos possuem ampla cobertura e a maior rede credenciada do Brasil, além de muitas vantagens e benefícios que tornam a sua experiência fluida, segura e descomplicada. Na Odontoprev você pode confiar!
    </p>

    <v-row justify="center">
      <v-col v-for="({ icon, text, bold }, i) in items" :key="i" cols="auto" class="px-16">
        <Icon :name="icon" color="primary" secondary-color="primary-lighten-1" width="78" height="58" />
        <EnchantedText tag="h5" :bold="bold" class="text-primary mt-4 text-h5">
          {{ text }}
        </EnchantedText>
      </v-col>
    </v-row>
  </v-container>
</template>

<section>

    </section>

<style scoped>

</style>
