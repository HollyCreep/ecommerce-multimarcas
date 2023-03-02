<script setup lang="ts">
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from './inputs/TextInput.vue'
import type { IDependente } from '~~/types/customer'

interface IDependenteForm extends IDependente {
  // checkbox: string
}

const props = defineProps<{ dependente?: IDependente }>()

const emit = defineEmits<{ (e: 'valid', value: boolean): boolean; (e: 'done', value: IDependente): IDependente }>()

const { handleSubmit, meta, setValues, submitForm } = useForm<IDependenteForm>({
  validationSchema: object({
    nome: string().required(),
    data_nascimento: string().required('O campo data de nascimento é obrigatório'),
    cpf: string().cpf().required(),
    rg: string().required(),
    nome_mae: string().required('O campo nome da mãe é obrigatório'),
    exp: string().required(),
  }),
})

watchEffect(async () => {
  emit('valid', meta.value.valid)
})

watch(() => props.dependente, (newValue) => {
  if (newValue) {
    setValues({ ...newValue })
    submitForm()
  }
}, { deep: true, immediate: true })

const onSubmit = handleSubmit((dependente) => {
  emit('done', dependente)
})

const cpfMask = { mask: '###.###.###-##' }
const dataMask = { mask: ['##/##/##', '##/##/####'] }
const radioInput = ref('1')
</script>

<template>
  <v-form @submit.prevent="onSubmit">
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
        Plano do dependente
      </h4>
      <v-divider class="my-4" />
    </div>

    <v-radio-group v-model="radioInput" color="primary">
      <v-radio class="text-main font-weight-bold font-soleto" label="É o mesmo plano do titular" value="1" />
      <v-radio class="text-main font-weight-bold font-soleto" label="É outro plano" value="2" />
    </v-radio-group>

    <v-btn color="secondary" size="large" type="submit" variant="flat" :disabled="!meta.valid">
      Cadastrar
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
  :deep(.v-radio-group) {
    label {
      opacity: 100% !important;
    }
  }
</style>
