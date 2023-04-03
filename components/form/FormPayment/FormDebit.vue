<script lang="ts" setup>
import SelectInput from '../inputs/SelectInput.vue'
const radioButton = ref('1')
</script>

<template>
  <v-form rounded="lg" @submit.prevent>
    <h5 class="text-primary font-weight-bold">
      Dados do titular da conta:
    </h5>
    <v-radio-group v-model="radioButton" class="mb-4" inline mandatory color="primary" hide-details>
      <v-radio label="Sim" value="1" />
      <v-radio label="Não" value="0" />
    </v-radio-group>

    <v-row>
      <v-col cols="12" md="6">
        <SelectInput name="type" :items="[]" variant="underlined" label="Tipo de Conta*" />
      </v-col>
      <v-col cols="12" md="6">
        <SelectInput name="installments" :items="[]" variant="underlined" label="Banco*" />
      </v-col>
    </v-row>

    <v-alert
      prominent
      type="warning"
      variant="text"
      class="px-0"
      icon="mdi-alert"
      color="#FFBC00"
    >
      <h6 class="text-main">
        <span class="font-weight-bold"> Importante: </span> Revise os dados bancários antes de enviar.
      </h6>
    </v-alert>

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
