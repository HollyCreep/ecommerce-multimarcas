<script setup lang="ts">
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import TextInput from './inputs/TextInput.vue'
import RadioInput from './inputs/RadioInput.vue'
import type { IProduct } from '~~/types/product'
import type { CartDependente } from '~~/types/cart'
import type { IDependente } from '~~/types/customer'

const props = defineProps<{ dependente?: CartDependente }>()
const emit = defineEmits<{ (e: 'submit', value: CartDependente): void }>()
const { getFeaturedProducts } = useProductStore()
const store = useCartStore()

const state = ref<{
  radioInput: number
  selectedProductIndex: number
  selectedProduct: IProduct
  products: IProduct[]
  loading: boolean
  errorPlan: string
}>({
  radioInput: 1,
  selectedProductIndex: null,
  selectedProduct: store.state.titular.product,
  products: [],
  loading: false,
  errorPlan: '',
})

const { handleSubmit, meta, setValues, validate } = useForm<IDependente>({
  validationSchema: object({
    nome: string().required(),
    data_nascimento: string().required('O campo data de nascimento é obrigatório'),
    cpf: string().cpf().required(),
    rg: string().required(),
    nome_mae: string().required('O campo nome da mãe é obrigatório'),
    exp: string().required(),
    gender: string().required('O campo gênero é obrigatório').oneOf(['MASCULINO', 'FEMININO']),
  }),
})

watchEffect(async () => {
  const product = state.value.products[state.value.selectedProductIndex]
  if (product)
    state.value.selectedProduct = product
})

const handleProductTypeChange = (newValue: number) => {
  state.value.selectedProductIndex = null
  state.value.selectedProduct = newValue === 1 ? store.state.titular.product : null
}

onMounted(async () => {
  state.value.loading = true
  state.value.products = await getFeaturedProducts()
  state.value.loading = false

  if (props.dependente) {
    setValues({ ...props.dependente.customer })
    if (store.state.titular.product.sku !== props.dependente.product.sku) {
      state.value.radioInput = 2
      const index = state.value.products.findIndex(p => p.sku === props.dependente.product.sku)
      if (index >= 0)
        state.value.selectedProductIndex = index
    }

    validate()
  }
})

const onSubmit = handleSubmit((dependente) => {
  state.value.errorPlan = state.value.selectedProduct ? '' : 'O plano é obrigatório'
  if (state.value.errorPlan)
    return
  emit('submit', { customer: dependente, product: state.value.selectedProduct })
})

const cpfMask = { mask: '###.###.###-##' }
const dataMask = { mask: ['##/##/##', '##/##/####'] }
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
        <v-col cols="12" md="6">
          <RadioInput name="gender" label="Gênero" inline color="primary" density="compact" />
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <h4 class="font-weight-bold text-primary">
        Plano do dependente
      </h4>
      <v-divider class="my-4" />
    </div>

    <v-radio-group v-model="state.radioInput" name="product" color="primary" @update:model-value="handleProductTypeChange">
      <v-radio
        class="text-main font-weight-bold font-blinker"
        label="É o mesmo plano do titular"
        :value="1"
      />
      <v-radio
        class="text-main font-weight-bold font-blinker"
        label="É outro plano"
        :disabled="state.loading || !state.products.length"
        :value="2"
      />
    </v-radio-group>

    <v-scroll-y-transition>
      <v-item-group
        v-if="state.radioInput === 2 && state.products.length"
        v-model="state.selectedProductIndex"
        selected-class="bg-primary"
        class="plan-card-container"
        mandatory
        @update:model-value="state.errorPlan = ''"
      >
        <v-item
          v-for="(product, i) in state.products"
          v-slot="{ selectedClass, isSelected, toggle }"
          :key="i"
        >
          <CartSmallPlanCard
            :product="product"
            :class="[selectedClass]"
            :active="isSelected"
            @click="toggle"
          />
        </v-item>
      </v-item-group>
    </v-scroll-y-transition>

    <v-scroll-x-transition>
      <div v-if="state.loading" class="container">
        <FunctionalsLinearLoader>
          Buscando planos
        </FunctionalsLinearLoader>
      </div>
    </v-scroll-x-transition>

    <v-scroll-x-transition>
      <h5 v-if="state.errorPlan" class="text-error">
        {{ state.errorPlan }}
      </h5>
    </v-scroll-x-transition>

    <v-btn color="secondary" size="large" type="submit" variant="flat" class="mt-4">
      {{ dependente ? 'Continuar' : 'Cadastrar' }}
    </v-btn>
  </v-form>
</template>

<style lang="scss" scoped>
  :deep(.v-radio-group) {
    label {
      opacity: 100% !important;
      font-size: 12px;
    }
  }

  .plan-card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
</style>
