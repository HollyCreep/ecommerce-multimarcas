<script setup lang="ts">
import { object, string, ref as yupRef } from 'yup'
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { omit } from 'lodash'
import TextInput from './inputs/TextInput.vue'
import RadioInput from './inputs/RadioInput.vue'
import type { ITitular } from '~~/types/customer'
import type { ISaveClientDTO } from '~~/composables/apis/cart/client.api'

interface ITitularForm extends ITitular {
  repeatEmail: string
}

const props = defineProps<{ customer?: ITitular }>()
const emit = defineEmits<{ (e: 'valid', value: boolean): void; (e: 'update:customer', value: ITitular): void; (e: 'submit'): void }>()

const { handleSubmit, meta, values, errors, setValues, validate } = useForm<ITitularForm>({
  validationSchema: object({
    name: string().required('O campo nome é obrigatório'),
    birthdate: string().required('O campo data de nascimento é obrigatório'),
    cpf: string().cpf().required(),
    rg: string().required(),
    documentIssue: string().required('O campo exp é obrigatório'),
    motherName: string().required('O campo nome da mãe é obrigatório'),
    gender: string().required('O campo gênero é obrigatório').oneOf(['MASCULINO', 'FEMININO']),
    email: string().required().email(),
    repeatEmail: string().required('Campo obrigatório').oneOf([yupRef('email')], 'O campo de email não conferem'),
    phone: string().required('O campo telefone é obrigatório'),

    address: string().required('O campo logradouro é obrigatório'),
    number: string().required('O campo número é obrigatório'),
    complement: string(),
    neighborhood: string().required('O campo bairro é obrigatório'),
    city: string().required('O campo cidade é obrigatório'),
    state: string().required('O campo estado é obrigatório'),
    zipCode: string().required('O campo CEP é obrigatório'),
  }),
})

watchEffect(async () => {
  emit('valid', meta.value.valid)
})

onMounted(() => {
  if (props.customer) {
    setValues({ ...props.customer, repeatEmail: props.customer.email })
    validate()
  }
})

const store = useCartStore()
const { saveAbandonedCart, saveClient } = useCartClientApi()
async function handleSaveAbandonedCart() {
  if (
    !!values.email
    && !!values.phone
    && !Object.prototype.hasOwnProperty.call(errors, 'email')
    && !Object.prototype.hasOwnProperty.call(errors, 'phone')
  ) {
    const plan = store.state.titular.product.planos.find(p => p.tipoNegociacao === store.state.selectedPeriodType)
    const { data, pending } = await saveAbandonedCart({
      email: values.email,
      phone: values.phone,
      planCode: plan.codigoPlano,
      price: plan.valorTitular,
      quantity: 1,
      contactId: store.state.contactId,
    })
    if (data.value) {
      store.state.contactId = data.value.contactId
      store.state.clientOrderId = data.value.clientOrderId
      store.state.numberProposal = data.value.numberProposal
    }
  }
}

watch(() => values.email, (newEmail, oldEmail) => {
  if (!!newEmail && newEmail !== oldEmail && !Object.prototype.hasOwnProperty.call(errors.value, 'email'))
    handleSaveAbandonedCart()
})
watch(() => values.phone, (newPhone, oldPhone) => {
  if (!!newPhone && newPhone !== oldPhone && !Object.prototype.hasOwnProperty.call(errors.value, 'phone'))
    handleSaveAbandonedCart()
})

const loading = ref(false)
const onSubmit = handleSubmit(async (FormCustomer) => {
  const store = useCartStore()
  const { state } = storeToRefs(store)

  const customer = omit(FormCustomer, ['repeatEmail'])
  const { clientOrderId, dependentes, responsavel } = state.value
  // if (!customer || !clientOrderId)
  //   return

  const payload: ISaveClientDTO = {
    ...customer,
    order: clientOrderId,
    dependent: dependentes.map(dep => dep.customer),
    responsavel,
  }

  const { pending } = await saveClient(payload)
  loading.value = pending.value
  emit('update:customer', customer)
  emit('submit')
})
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
            masked
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
            name="name"
            variant="underlined"
            label="Nome"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            v-maska:[dataMask]
            masked
            name="birthdate"
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
            name="documentIssue"
            variant="underlined"
            label="Exp"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="motherName"
            variant="underlined"
            label="Nome da mãe"
          />
        </v-col>
        <v-col cols="12" md="6">
          <RadioInput name="gender" label="Gênero" inline color="primary" density="compact" />
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
            name="zipCode"
            variant="underlined"
            label="Cep"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <TextInput
            name="address"
            variant="underlined"
            label="Logradouro"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="number"
            variant="underlined"
            label="Número"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="complement"
            variant="underlined"
            label="Complemento"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="neighborhood"
            variant="underlined"
            label="Bairro"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="city"
            variant="underlined"
            label="Cidade"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            name="state"
            variant="underlined"
            label="Estado"
          />
        </v-col>
      </v-row>
    </div>

    <v-btn :color="meta.valid ? 'secondary' : 'error'" size="large" type="submit" variant="flat">
      {{ customer ? 'Continuar' : 'Cadastrar' }}
    </v-btn>
  </v-form>
</template>
