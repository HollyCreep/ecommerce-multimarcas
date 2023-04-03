<script setup lang="ts">
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from './inputs/TextInput.vue'
import RadioInput from './inputs/RadioInput.vue'
import type { IResponsavel, Sexo } from '~~/types/customer'

interface FormResponsavel extends Omit<IResponsavel, 'sexo'> {}

const props = defineProps<{ responsavel?: IResponsavel }>()
const emit = defineEmits<{ (e: 'update:responsavel', value: IResponsavel): void; (e: 'submit'): void }>()

const { handleSubmit, meta, setValues, validate } = useForm<FormResponsavel>({
  validationSchema: object({
    nome: string().required(),
    cpf: string().cpf().required(),
    data_nascimento: string().required('O campo data de nascimento é obrigatório'),
    telefone: string().required(),
    email: string().required().email(),
    gender: string().required('O campo gênero é obrigatório').oneOf(['MASCULINO', 'FEMININO']),
  }),
})

const onSubmit = handleSubmit((FormResponsavel) => {
  const sexo = FormResponsavel.gender.slice(0, 1).toLocaleLowerCase() as Sexo
  const responsavel: IResponsavel = { ...FormResponsavel, sexo }
  emit('update:responsavel', responsavel)
  emit('submit')
})

onMounted(() => {
  if (props.responsavel) {
    setValues({ ...props.responsavel })
    validate()
  }
})

const cpfMask = { mask: '###.###.###-##' }
const dataMask = { mask: ['##/##/##', '##/##/####'] }
const phoneMask = { mask: ['(##) ####-####', '(##) #####-####'] }
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
            v-maska:[phoneMask]
            name="telefone"
            variant="underlined"
            label="Telefone ou celular"
          />
        </v-col>
        <v-col cols="12" md="6">
          <RadioInput name="gender" label="Gênero" inline color="primary" density="compact" />
        </v-col>
      </v-row>
    </div>

    <v-btn :color="meta.valid ? 'secondary' : 'error'" size="large" type="submit" variant="flat">
      {{ responsavel ? 'Continuar' : 'Cadastrar' }}
    </v-btn>
  </v-form>
</template>
