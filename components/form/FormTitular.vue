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

const cpfMask = { mask: '###.###.###-##' }
const dataMask = { mask: ['##/##/##', '##/##/####'] }
const phoneMask = { mask: ['(##) ####-####', '(##) #####-####'] }
const loading = ref(false)
const error = ref(null)
const mounted = ref(false)

const { handleSubmit, resetForm, meta, values, errors, setValues, validate } = useForm<ITitularForm>({
  validationSchema: object({
    name: string().required('O campo nome é obrigatório'),
    birthdate: string().required('O campo data de nascimento é obrigatório').min(8),
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

onMounted(async () => {
  if (props.customer) {
    setValues({ ...props.customer, repeatEmail: props.customer.email, complement: '' })
    await validate()
  }
  mounted.value = true
})

watchEffect(() => emit('valid', meta.value.valid))

watch(() => values.email, (newEmail, oldEmail) => {
  if (!!newEmail && newEmail !== oldEmail && !Object.prototype.hasOwnProperty.call(errors.value, 'email'))
    handleSaveAbandonedCart()
}, { immediate: false })

watch(() => values.phone, (newPhone, oldPhone) => {
  if (!!newPhone && newPhone !== oldPhone && !Object.prototype.hasOwnProperty.call(errors.value, 'phone'))
    handleSaveAbandonedCart()
}, { immediate: false })

const store = useCartStore()
const { saveAbandonedCart, saveClient } = useCartClientApi()

async function handleSaveAbandonedCart() {
  if (
    !!mounted.value
    && !loading.value
    && !!values.email
    && !!values.phone
    && !Object.prototype.hasOwnProperty.call(errors, 'email')
    && !Object.prototype.hasOwnProperty.call(errors, 'phone')
  ) {
    const plan = store.state.titular.product.planos.find(p => p.tipoNegociacao === store.state.selectedPeriodType)
    loading.value = true
    const { data } = await saveAbandonedCart({
      email: values.email,
      phone: values.phone,
      planCode: plan.codigoPlano,
      price: plan.valorTitular,
      quantity: 1,
      contactId: store.state.contactId,
    })
    loading.value = false
    if (data.value) {
      store.state.contactId = data.value.contactId
      store.state.clientOrderId = data.value.clientOrderId
      store.state.numberProposal = data.value.numberProposal
      return true
    }
    return false
  }
}

const onSubmit = handleSubmit(async (FormCustomer) => {
  const store = useCartStore()
  const { state } = storeToRefs(store)

  const customer = omit(FormCustomer, ['repeatEmail'])
  const { clientOrderId, dependentes, responsavel } = state.value
  if (!clientOrderId) {
    const res = await handleSaveAbandonedCart()
    if (!res)
      return
  }

  const payload: ISaveClientDTO = {
    ...customer,
    order: clientOrderId,
    dependent: dependentes.map(dep => dep.customer),
    responsavel,
  }

  loading.value = true
  const { error: responseError } = await saveClient(payload)
  loading.value = false

  if (responseError.value)
    return error.value = responseError.value

  error.value = null
  emit('update:customer', customer)
  emit('submit')
  resetForm()
})
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

    <div>
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

    <v-fade-transition>
      <p v-if="error" class="text-error">
        Ops! Ocorreu uma falha ao salvar os dados, favor revisar os campos e tentar novamente!
      </p>
    </v-fade-transition>

    <v-btn :color="meta.valid ? 'secondary' : 'error'" size="large" type="submit" variant="flat" :loading="loading" class="mt-4">
      {{ customer ? 'Continuar' : 'Cadastrar' }}
    </v-btn>
  </v-form>
</template>
