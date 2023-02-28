import { defineStore } from 'pinia'
import type { ICustomer, IPlan } from '~~/types/product'
import { CartSteps } from '~/types/cart'
import type { PaymentTypes } from '~/types/cart'

import type { Period } from '~~/types'
import type { ICartStepItem } from '~~/components/cart/Steps.vue'

interface CartContent {
  customer: ICustomer
  plan: IPlan
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
  const state = ref(useLocalStorage<CartStore>('cart', defaultValues))
  const steps = ref<Record<CartSteps, ICartStepItem>>({
    [CartSteps.titular]: { text: 'Cadastrar titular', valid: false, required: true },
    [CartSteps.dependente]: { text: 'Cadastrar dependente', valid: false, required: false },
    [CartSteps.checkout]: { text: 'Detalhes Pagamento' },
  })

  /* --------------------------------- Titular -------------------------------- */
  const addPlanoTitular = (payload: IPlan) => {
    state.value.titular.plan = payload
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
    state.value.titular.plan = undefined
  }

  /* ------------------------------- Dependentes ------------------------------ */
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

  /* --------------------------------- Getters -------------------------------- */
  const total = computed(() => {
    if (!state.value.titular?.plan)
      return 0

    const totalDependentes = Object.values(state.value.dependentes).reduce((acc, { plan }) => {
      const valorDependente = plan?.valorDependente || 0
      return acc + valorDependente
    }, 0)

    return state.value.titular.plan.valorTitular + totalDependentes
  })

  const count = computed(() => {
    const { titular, dependentes } = state.value
    return Number(!!titular.plan) + dependentes.length
  })

  const items = computed(() => {
    const { titular, dependentes } = state.value
    if (!titular.plan)
      return []

    const planoTitular = { ...titular.plan, valor: titular.plan.valorTitular, delete: deletePlanoTitular }
    const planosDependentes = Object.values(dependentes).map(({ plan }, i) => ({ ...plan, valor: plan.valorDependente, delete: () => removerDependente(i) }))
    return [planoTitular, ...planosDependentes]
  })

  const isValid = computed(() => {
    return Object.values(steps.value).every(step => !!step.valid)
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

    total,
    count,
    items,
    isValid,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
