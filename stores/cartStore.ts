import { defineStore } from 'pinia'
import type { ICustomer, IProduct } from '~~/types/product'
import { CartSteps } from '~/types/cart'
import type { ComputedCartItem, PaymentTypes } from '~/types/cart'

import type { Period } from '~~/types'
import type { ICartStepItem } from '~~/components/cart/Steps.vue'

interface CartContent {
  customer: ICustomer
  product: IProduct
}

interface CartStore {
  selectedPeriodType: Period
  paymentMethod: PaymentTypes
  titular: CartContent | Partial<CartContent>
  dependentes: CartContent[]
}

const defaultValues: CartStore = {
  selectedPeriodType: 'MENSAL',
  paymentMethod: null,
  titular: {},
  dependentes: [],
}

export const useCartStore = defineStore('cart', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const state = ref(useLocalStorage<CartStore>('cart', defaultValues, { mergeDefaults: true }))
  const steps = ref<Record<CartSteps, ICartStepItem>>({
    [CartSteps.titular]: { text: 'Cadastrar titular', valid: false, required: true },
    [CartSteps.dependente]: { text: 'Cadastrar dependente', valid: false, required: false },
    [CartSteps.checkout]: { text: 'Detalhes Pagamento' },
  })

  /* -------------------------------------------------------------------------- */
  /*                                  CADASTRO                                  */
  /* -------------------------------------------------------------------------- */

  /* TITULAR __________________________________________________________________ */
  const addPlanoTitular = (payload: IProduct) => {
    state.value.titular.product = payload
  }
  const addDadosTitular = (payload: ICustomer) => {
    state.value.titular.customer = payload
  }
  const updateDadosTitular = (payload: Partial<ICustomer>) => {
    if (!state.value.titular.customer)
      return new Error('Preencha todos os dados do titular')
    state.value.titular.customer = { ...state.value.titular.customer, ...payload }
  }
  const addTitular = (payload: CartContent) => {
    state.value.titular = payload
  }
  const deleteTitular = () => {
    state.value.titular = {}
    state.value.dependentes = []
  }
  const deletePlanoTitular = () => {
    state.value.titular.product = undefined
  }

  /* DEPENDENTE _______________________________________________________________ */
  const addDependente = (payload: CartContent) => {
    state.value.dependentes.push(payload)
  }
  const updateDadosDependente = (payload: Partial<ICustomer>, index: number) => {
    const dependente = state.value.dependentes[index]

    if (!dependente)
      return new Error('Dependente não encontrado')
    state.value.dependentes[index] = { ...dependente, ...payload }
  }
  const removerDependente = (index: number) => {
    state.value.dependentes.splice(index, 1)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  PAGAMENTO                                 */
  /* -------------------------------------------------------------------------- */
  const changePeriod = (payload: Period) => {
    state.value.selectedPeriodType = payload
  }

  /* -------------------------------------------------------------------------- */
  /*                                    STEPS                                   */
  /* -------------------------------------------------------------------------- */
  const updateStepValidation = (payload: { value: boolean; step: CartSteps }) => {
    steps.value[payload.step].valid = payload.value
  }
  const isValid = computed((): boolean => {
    return Object.values(steps.value).every(step => !!step.valid)
  })

  /* -------------------------------------------------------------------------- */
  /*                                  PRODUTOS                                  */
  /* -------------------------------------------------------------------------- */
  const total = computed((): number => {
    if (!state.value.titular?.product)
      return 0

    const totalDependentes = Object.values(state.value.dependentes).reduce((acc, { product }) => {
      const plan = product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)
      const valorDependente = plan?.valorDependente || 0
      return acc + valorDependente
    }, 0)

    const planoTitular = state.value.titular.product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)

    return planoTitular.valorTitular + totalDependentes
  })

  const count = computed((): number => {
    const { titular, dependentes } = state.value
    return Number(!!titular.product) + dependentes.length
  })

  const items = computed((): ComputedCartItem[] => {
    const { titular, dependentes } = state.value
    if (!titular.product)
      return []

    const plan = state.value.titular.product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)
    const planoTitular = { ...plan, valor: plan.valorTitular, logo: state.value.titular.product.logo, delete: deletePlanoTitular }

    const planosDependentes = Object.values(dependentes).map(({ product }, i) => {
      const plan = product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)

      return { ...plan, valor: plan.valorDependente, logo: product.logo, delete: () => removerDependente(i) }
    })

    return [planoTitular, ...planosDependentes]
  })

  return {
    state,
    steps,

    addPlanoTitular,
    addDadosTitular,
    updateDadosTitular,
    addTitular,
    deleteTitular,
    deletePlanoTitular,

    addDependente,
    updateDadosDependente,
    removerDependente,

    changePeriod,

    updateStepValidation,
    isValid,

    total,
    count,
    items,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
