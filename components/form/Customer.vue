<script setup lang="ts">
import { object, string, ref as yupRef } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from './inputs/TextInput.vue'
import type { ICustomer } from '~~/types/product'
interface ICustomerForm extends ICustomer {
  password: string
  repeatPassword: string
  repeatEmail: string
}

const { handleSubmit, errors } = useForm<ICustomerForm>({
  validationSchema: object({
    'email': string().required('O campo email é obrigatório').email('O valor informado não é um email válido'),
    'repeatEmail': string().required().oneOf([yupRef('email')], 'O campo de email não são iguais'),
    'password': string().required().min(8),
    'repeatPassword': string().required().oneOf([yupRef('password')], 'O campo de senha não são iguais'),
    'nome': string().required(),
    'phone': string().required(),
    'data_nascimento': string().required(),
    'cpf': string().cpf().required(),
    'rg': string().required(),
    'nome_mae': string().required(),
    'exp': string().required(),
    'endereco.cep': string().required(),
    'endereco.logradouro': string().required(),
    'endereco.numero': string().required(),
    'endereco.complemento': string().required(),
    'endereco.bairro': string().required(),
    'endereco.cidade': string().required(),
    'endereco.estado': string().required(),
  }),
})

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <v-container>
    <v-form @submit.prevent="submit">
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
              name="phone"
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
              name="data_nascimento"
              variant="underlined"
              label="Data de Nascimento"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TextInput
              name="cpf"
              variant="underlined"
              label="CPF"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TextInput
              name="rg"
              variant="underlined"
              label="RG"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TextInput
              name="nome_mae"
              variant="underlined"
              label="Nome da mãe"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TextInput
              name="exp"
              variant="underlined"
              label="Exp"
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
              name="password"
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

      <v-btn color="secondary" size="large" type="submit">
        Cadastrar
      </v-btn>
    </v-form>
  </v-container>
</template>
