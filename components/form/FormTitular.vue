<script setup lang="ts">
import { object, string, ref as yupRef } from 'yup'
import { useForm } from 'vee-validate'
import { omit } from 'lodash'
import TextInput from './inputs/TextInput.vue'
import type { ITitular } from '~~/types/customer'

interface ITitularForm extends ITitular {
  senha: string
  repeatPassword: string
  repeatEmail: string
}

const props = defineProps<{ customer?: ITitular }>()
const emit = defineEmits<{ (e: 'valid', value: boolean): boolean; (e: 'update:customer', value: ITitular): ITitular }>()

const { handleSubmit, meta, setValues, submitForm } = useForm<ITitularForm>({
  validationSchema: object({
    email: string().required().email(),
    repeatEmail: string().required().oneOf([yupRef('email')], 'O campo de email não conferem'),
    senha: string().required().min(8),
    repeatPassword: string().required('O campo de confirmação de senha é obrigatório').oneOf([yupRef('senha')], 'O campo de senha não conferem'),
    nome: string().required(),
    telefone: string().required(),
    data_nascimento: string().required('O campo data de nascimento é obrigatório'),
    cpf: string().cpf().required(),
    rg: string().required(),
    nome_mae: string().required('O campo nome da mãe é obrigatório'),
    exp: string().required(),
    endereco: object({
      cep: string().required(),
      logradouro: string().required(),
      numero: string().required(),
      complemento: string(),
      bairro: string().required(),
      cidade: string().required(),
      estado: string().required(),
    }),
  }),
})

watchEffect(async () => {
  emit('valid', meta.value.valid)
})

const onSubmit = handleSubmit((FormCustomer) => {
  const customer = omit(FormCustomer, ['repeatPassword', 'repeatEmail'])
  emit('update:customer', customer)
})

watch(() => props.customer, (newValue) => {
  if (newValue) {
    setValues({ ...newValue, repeatPassword: newValue.senha, repeatEmail: newValue.email })
    submitForm()
  }
}, { deep: true, immediate: true })

const cpfMask = { mask: '###.###.###-##' }
const dataMask = { mask: ['##/##/##', '##/##/####'] }
const phoneMask = { mask: ['(##) ####-####', '(##) #####-####'] }
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <div class="mb-4">
      <h4 class="font-weight-bold text-primary">
        Contato
      </h4>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="email"
            variant="underlined"
            label="Email"
            type="email"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="repeatEmail"
            variant="underlined"
            label="Repita o email"
            type="email"
          />
        </v-col>
        <v-col>
          <TextInput
            v-maska:[phoneMask]
            name="telefone"
            variant="underlined"
            label="Telefone ou celular"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <h4 class="font-weight-bold text-primary">
        Dados pessoais
      </h4>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="nome"
            variant="underlined"
            label="Nome"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            v-maska:[dataMask]
            name="data_nascimento"
            variant="underlined"
            label="Data de Nascimento"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            v-maska:[cpfMask]
            name="cpf"
            variant="underlined"
            label="CPF"
          />
        </v-col>
        <v-col cols="12" md="4">
          <TextInput
            name="rg"
            variant="underlined"
            label="RG"
          />
        </v-col>
        <v-col cols="12" md="2">
          <TextInput
            name="exp"
            variant="underlined"
            label="Exp"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="nome_mae"
            variant="underlined"
            label="Nome da mãe"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <h4 class="font-weight-bold text-primary">
        Endereço
      </h4>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.cep"
            variant="underlined"
            label="Cep"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.logradouro"
            variant="underlined"
            label="Logradouro"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.numero"
            variant="underlined"
            label="Número"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.complemento"
            variant="underlined"
            label="Complemento"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.bairro"
            variant="underlined"
            label="Bairro"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.cidade"
            variant="underlined"
            label="Cidade"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="endereco.estado"
            variant="underlined"
            label="Estado"
          />
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <h4 class="font-weight-bold text-primary">
        Senha de acesso
      </h4>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="senha"
            variant="underlined"
            label="Nova senha"
            type="password"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="repeatPassword"
            variant="underlined"
            label="Confirme a senha"
            type="password"
          />
        </v-col>
      </v-row>
    </div>

    <v-btn color="secondary" size="large" type="submit" variant="flat" :disabled="!meta.valid">
      Cadastrar
    </v-btn>
  </v-form>
</template>
