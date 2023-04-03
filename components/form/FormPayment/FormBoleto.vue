<template>
  <v-form rounded="lg" @submit.prevent>
    <h5 class="text-primary font-weight-bold mb-4">
      Pagamento via boleto bancário
    </h5>

    <p class="text-main mb-4">
      Seu boleto será gerado após a confirmação.
    </p>

    <InputsCheckboxInput color="primary" name="terms" density="compact">
      <EnchantedText :link="{ text: 'termos de contrato', href: 'https://odontoprev.com.br/termos-de-uso' }">
        Eu aceito os termos de contrato
      </EnchantedText>
    </InputsCheckboxInput>

    <v-btn color="secondary" size="large" type="submit" variant="flat" class="mt-4" rounded="lg" min-width="200">
      Finalizar compra
    </v-btn>
  </v-form>
</template>
