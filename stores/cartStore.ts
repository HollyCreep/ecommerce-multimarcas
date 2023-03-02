import { defineStore } from 'pinia'
import type { IProduct } from '~~/types/product'
import type { IDependente, ITitular } from '~~/types/customer'
import type { CartDependente, CartSteps, CartStore, CartTitular, ComputedCartItem, ICartStepItem } from '~/types/cart'

import type { Period } from '~~/types'

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
  const private_steps = ref<ICartStepItem[]>([
    { text: 'Cadastrar titular', step: 'titular', valid: false, required: true },
    { text: 'Cadastrar dependente', step: 'dependente', valid: false, required: false },
    { text: 'Detalhes Pagamento', step: 'checkout' },
  ])

  /* -------------------------------------------------------------------------- */
  /*                                  CADASTRO                                  */
  /* -------------------------------------------------------------------------- */

  /* TITULAR __________________________________________________________________ */
  const addPlanoTitular = (payload: IProduct) => {
    state.value.titular.product = payload
  }
  const addDadosTitular = (payload: ITitular) => {
    state.value.titular.customer = payload
  }
  const updateDadosTitular = (payload: Partial<ITitular>) => {
    if (!state.value.titular.customer)
      return new Error('Preencha todos os dados do titular')
    state.value.titular.customer = { ...state.value.titular.customer, ...payload }
  }
  const addTitular = (payload: CartTitular) => {
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
  const addDependente = (payload: CartDependente) => {
    state.value.dependentes.push(payload)
  }
  const getDependente = (index: number | string) => {
    return state.value.dependentes?.[+index]?.customer || undefined
  }
  const updateDadosDependente = (payload: Partial<IDependente>, index: number) => {
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
  const steps = computed((): ICartStepItem[] => {
    return private_steps.value.flatMap(item => (item.step === 'dependente' && !state.value.dependentes.length) ? [] : item)
  })
  const updateStepValidation = (payload: { value: boolean; step: CartSteps }) => {
    const index = private_steps.value.findIndex(item => item.step === payload.step)
    if (index >= 0)
      private_steps.value[index].valid = payload.value
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
    getDependente,
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
