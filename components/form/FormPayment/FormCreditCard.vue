<script setup lang="ts">
import { bool, object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from '../inputs/TextInput.vue'
import SelectInput from '../inputs/SelectInput.vue'
import type { CreditCardBrands, IFormCreditCard, Sistema } from '~~/types/payment'

const props = defineProps<{ system: Sistema; installments?: number[] }>()
const emit = defineEmits<{ (e: 'valid', value: boolean): void; (e: 'submit', value: IFormCreditCard): void }>()

const store = useCartStore()
const loading = ref(false)
const activeBrand = ref<CreditCardBrands>(null)
const flipCreditCard = ref(false)

const creditCardMask = { mask: '#### #### #### ####' }
const expirationMask = { mask: ['##/##', '##/####'] }
const CVVMask = { mask: '###' }
const cardBrandLogos: Record<CreditCardBrands, string> = {
  master: 'creditCardBrands/mastercard',
  visa: 'creditCardBrands/visa',
  amex: 'creditCardBrands/amex',
  elo: 'creditCardBrands/elo',
}

const { handleSubmit, meta, values } = useForm<IFormCreditCard>({
  validationSchema: object({
    RawNumber: string().cardNumber().required(),
    Expiration: string().cardExpiry().required(),
    SecurityCode: string().cardCVV().required(),
    HolderName: string().required(),
    installments: string().required(),
    terms: bool().required().equals([true]),
  }),
})

const parcelas = computed(() => {
  if (!props.installments.length)
    return [{ value: 1, title: `${1}x - ${store.total} ` }]

  return props.installments.reduce((acc, qtdParcelas) => {
    const valorParcela = (store.total / qtdParcelas).toFixed(2)
    acc.push({ value: qtdParcelas, title: `${qtdParcelas}x - ${valorParcela} ` })
    return acc
  }, [])
})

const onSubmit = handleSubmit(async (creditCard, { resetForm }) => {
  const paymentApi = useCartPaymentApi()
  loading.value = true
  const { data: token } = await paymentApi.generatePaymentToken(store.state.numberProposal)
  const { data: paymentToken } = await paymentApi.tokenizarCartao({ ...creditCard, AccessToken: token.value.accessToken })
  const { data, error } = await paymentApi.cobrarCartao({
    flag: activeBrand.value,
    cpf: store.state.titular.customer.cpf,
    name: store.state.titular.customer.name,
    paymentToken: paymentToken.value.PaymentToken,
    installments: creditCard.installments,
    proposal: store.state.numberProposal,
    system: props.system,
    price: cartUtils.convertNumberToAPIFormat(store.total),
  })

  if (data.value && !error)
    resetForm()

  loading.value = false
})

function flipCard() {
  flipCreditCard.value = !flipCreditCard.value
}
function handleBrandChange(newBrand: CreditCardBrands) {
  activeBrand.value = newBrand
}
watchEffect(async () => {
  emit('valid', meta.value.valid)
})
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <div class="mb-4">
      <h5 class="font-weight-bold text-primary mb-4">
        Preencha os campos abaixo:
      </h5>

      <v-item-group
        v-model="activeBrand"
        selected-class="active"
        class="mb-8 d-flex"
        mandatory
      >
        <v-item
          v-for="(logo, brand) in cardBrandLogos"
          v-slot="{ selectedClass }"
          :key="brand"
          :value="brand"
        >
          <Icon :name="logo" filled class="logo text-h1 mx-2" color="primary" :class="[selectedClass]" />
        </v-item>
      </v-item-group>

      <v-row>
        <v-col cols="12">
          <TextInput
            v-maska:[creditCardMask]
            masked
            name="RawNumber"
            variant="underlined"
            label="Número do cartão"
          />
        </v-col>
        <v-col cols="12">
          <TextInput
            name="HolderName"
            variant="underlined"
            label="Nome (o mesmo que aparece no cartão)*"
            placeholder="Digite o nome que aparece no cartão"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            v-maska:[expirationMask]
            name="Expiration"
            variant="underlined"
            label="Validade*"
            placeholder="MM/AA"
          />
        </v-col>
        <v-col cols="12" md="6">
          <TextInput
            v-maska:[CVVMask]
            name="SecurityCode"
            variant="underlined"
            label="CVV*"
            placeholder="000"
            @update:focused="flipCard"
          />
        </v-col>
      </v-row>
    </div>

    <CartCreditCard
      class="mb-4"
      :class="{ flip: flipCreditCard }"
      :card-number="values.RawNumber"
      :card-owner="values.HolderName"
      :card-cvv="values.SecurityCode"
      :card-expiration="values.Expiration"
      @brand="handleBrandChange"
    />

    <SelectInput name="installments" :items="parcelas" variant="underlined" label="Parcelas*" />

    <InputsCheckboxInput color="primary" name="terms">
      <EnchantedText :link="{ text: 'termos de contrato', href: 'https://odontoprev.com.br/termos-de-uso' }">
        Eu aceito os termos de contrato
      </EnchantedText>
    </InputsCheckboxInput>

    <v-btn color="secondary" size="large" type="submit" variant="flat" class="mt-4" rounded="lg" :loading="loading">
      Finalizar compra
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
.logo:not(.active) {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>
