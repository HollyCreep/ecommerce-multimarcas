<script setup lang="ts">
import { bool, object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from '../inputs/TextInput.vue'
import SelectInput from '../inputs/SelectInput.vue'
import type { CreditCardBrands, IFormCreditCard } from '~~/types/payment'

const emit = defineEmits<{ (e: 'valid', value: boolean): void; (e: 'submit', value: IFormCreditCard): void }>()
const { handleSubmit, meta, values } = useForm<IFormCreditCard>({
  validationSchema: object({
    RawNumber: string().cardNumber().required(),
    Expiration: string().cardExpiry().required(),
    SecurityCode: string().cardCVV().required(),
    HolderName: string().required(),
    installments: string().required(), // 1 | 3 | 6 | 12
    terms: bool().required().equals([true]),
  }),
})

watchEffect(async () => {
  emit('valid', meta.value.valid)
})

const fakeLoading = ref(false)

const onSubmit = handleSubmit((creditCard, { resetForm }) => {
  emit('submit', creditCard)
  fakeLoading.value = true
  setTimeout(() => {
    fakeLoading.value = false
    resetForm()
  }, 1000)
})

const activeBrand = ref('')

const cardBrandToClass: Record<CreditCardBrands, string> = {
  mastercard: 'creditCardBrands/mastercard',
  visa: 'creditCardBrands/visa',
  amex: 'creditCardBrands/amex',
  elo: 'creditCardBrands/elo',
}

const creditCardMask = { mask: '#### #### #### ####' }
const expirationMask = { mask: ['##/##', '##/####'] }
const CVVMask = { mask: '###' }

const parcelas = ref([
  { value: 1, title: `${1}x - ${100} ( sem juros ) ` },
  { value: 2, title: `${2}x - ${100} ( sem juros )` },
  { value: 3, title: `${3}x - ${100} ( sem juros )` },
  { value: 4, title: `${4}x - ${100} ` },
  { value: 5, title: `${5}x - ${100} ` },
  { value: 6, title: `${6}x - ${100} ` },
  { value: 7, title: `${7}x - ${100} ` },
  { value: 8, title: `${8}x - ${100} ` },
  { value: 9, title: `${9}x - ${100} ` },
  { value: 11, title: `${11}x - ${100} ` },
  { value: 12, title: `${12} - ${100} ` },
])

const flipCreditCard = ref(false)
const flipCard = () => {
  flipCreditCard.value = !flipCreditCard.value
}

const { getCompanyAvaiblePaymentMethods } = useCartPaymentApi()
const res = await getCompanyAvaiblePaymentMethods()
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
          v-for="(logo, brand) in cardBrandToClass"
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
      @brand="activeBrand = $event"
    />

    <SelectInput name="installments" :items="parcelas" variant="underlined" label="Parcelas*" />

    <InputsCheckboxInput color="primary" name="terms">
      <EnchantedText :link="{ text: 'termos de contrato', href: 'https://odontoprev.com.br/termos-de-uso' }">
        Eu aceito os termos de contrato
      </EnchantedText>
    </InputsCheckboxInput>

    <v-btn color="secondary" size="large" type="submit" variant="flat" class="mt-4" rounded="lg" :loading="fakeLoading">
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
