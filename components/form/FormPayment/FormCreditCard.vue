<script setup lang="ts">
import { bool, object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from '../inputs/TextInput.vue'
import SelectInput from '../inputs/SelectInput.vue'
import type { CreditCardBrands, IFormCreditCard, Sistema } from '~~/types/payment'

const props = defineProps<{ system: Sistema; installments?: number[] }>()
const emit = defineEmits<{ (e: 'valid', value: boolean): void; (e: 'submited'): void }>()

const cartStore = useCartStore()
const appStore = useAppStore()
const error = ref(null)
const activeBrand = ref<CreditCardBrands>(null)
const flipCreditCard = ref(false)

const creditCardMask = { mask: '#### #### #### ####' }
const expirationMask = { mask: '##/####' }
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
    return [{ value: 1, title: `${1}x - ${cartStore.total} ` }]

  return props.installments.reduce((acc, qtdParcelas) => {
    const valorParcela = (cartStore.total / qtdParcelas).toFixed(2)
    acc.push({ value: qtdParcelas, title: `${qtdParcelas}x - ${valorParcela} ` })
    return acc
  }, [])
})

const onSubmit = handleSubmit(async (creditCard, { resetForm }) => {
  const paymentApi = useCartPaymentApi()
  appStore.startBuffering(4, 'Processando pagamento')
  error.value = null

  try {
    const { data: token } = await paymentApi.generatePaymentToken(cartStore.state.numberProposal)
    appStore.updateBuffer()

    const { data: paymentToken } = await paymentApi.tokenizarCartao({ ...creditCard, AccessToken: token.value.accessToken })
    appStore.updateBuffer()

    await paymentApi.saveCreditCardTokenLog({ order: cartStore.state.clientOrderId, PaymentToken: paymentToken.value.PaymentToken })
    appStore.updateBuffer()

    const { data: result } = await paymentApi.cobrarCartao({
      flag: activeBrand.value,
      cpf: cartStore.state.titular.customer.cpf,
      name: cartStore.state.titular.customer.name,
      paymentToken: paymentToken.value.PaymentToken,
      installments: creditCard.installments,
      proposal: cartStore.state.numberProposal,
      system: props.system,
      price: cartUtils.convertNumberToAPIFormat(cartStore.total),
    })
    appStore.updateBuffer()

    if (result.value.sucesso === 1) {
      emit('submited')
      appStore.updateBuffer({ status: 'success', message: 'Pagamento realizado com sucesso!' })
      resetForm()
    }
    else {
      error.value = result.value.mensagem
      appStore.updateBuffer({ status: 'error', message: result.value.mensagem })
    }
  }
  catch (e) {
    error.value = 'Tentar novamente ou pagar com outro método.'
    appStore.updateBuffer({ status: 'error', message: 'Falha ao processar pagamento.' })
  }
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
            placeholder="MM/AAAA"
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

    <InputsCheckboxInput color="primary" name="terms" density="compact">
      <EnchantedText :link="{ text: 'termos de contrato', href: 'https://odontoprev.com.br/termos-de-uso' }">
        Eu aceito os termos de contrato
      </EnchantedText>
    </InputsCheckboxInput>

    <v-slide-x-transition>
      <v-alert
        v-if="error"
        prominent
        type="error"
        variant="text"
        closable
        class="px-0"
      >
        <h6 class="text-main">
          Ops! Aconteceu um problema seu pagamento.
        </h6>
        <h6 class="text-main font-weight-bold">
          {{ error }}
        </h6>
      </v-alert>
    </v-slide-x-transition>
    <v-btn color="secondary" size="large" type="submit" variant="flat" class="mt-4" rounded="lg" :loading="appStore.loading">
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
