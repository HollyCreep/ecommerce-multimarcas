import { defineStore } from 'pinia'
import type { IProduct } from '~~/types/product'
import type { IDependente, ITitular } from '~~/types/customer'
import type { CartDependente, CartSteps, CartStore, CartTitular, ICartSummary, IComputedCartItem } from '~/types/cart'

import type { Period } from '~~/types'

const defaultValues: CartStore = {
  selectedPeriodType: 'MENSAL',
  paymentMethod: null,
  titular: {},
  dependentes: [],
  steps: [
    { text: 'Cadastrar titular', step: 'titular', valid: false, required: true },
    { text: 'Detalhes Pagamento', step: 'checkout' },
  ],
}

export const useCartStore = defineStore('cart', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const state = ref(useLocalStorage<CartStore>('cart', defaultValues, { mergeDefaults: true }))

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
    if (!payload.customer)
      return new Error('Preencha todos os dados do dependente')
    if (!payload.product)
      return new Error('Produto inv??lido')
    state.value.dependentes.push(payload)
  }
  const getDependente = (index: number) => {
    return state.value.dependentes?.[index] || undefined
  }
  const updateDadosDependente = (payload: Partial<IDependente>, index: number): void | Error => {
    const dependente = state.value.dependentes[index]

    if (!dependente)
      return new Error('Dependente n??o encontrado')
    state.value.dependentes[index] = { ...dependente, ...payload }
  }
  const updateDependente = (payload: CartDependente, index: number): void | Error => {
    const dependente = state.value.dependentes[index]

    if (!dependente)
      return new Error('Dependente n??o encontrado')
    state.value.dependentes[index] = payload
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
    const index = state.value.steps.findIndex(item => item.step === payload.step)
    if (index >= 0)
      state.value.steps[index].valid = payload.value
  }
  const isValid = computed((): boolean => {
    return Object.values(state.value.steps).every(step => !!step.valid)
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

  const items = computed((): IComputedCartItem[] => {
    const { titular, dependentes } = state.value
    if (!titular.product)
      return []

    const plan = state.value.titular.product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)
    const computedTitular = {
      plan: { ...plan, valor: plan.valorTitular, logo: state.value.titular.product.logo },
      customer: state.value.titular.customer,
      update: updateDadosTitular,
      delete: deletePlanoTitular,
    }

    const computedDependentes = Object.values(dependentes).map(({ customer, product }, i) => {
      const plan = product.planos.find(p => p.tipoNegociacao === state.value.selectedPeriodType)

      return { plan: { ...plan, valor: plan.valorDependente, logo: product.logo }, customer, update: (payload: Partial<IDependente>) => updateDadosDependente(payload, i), delete: () => removerDependente(i) }
    })

    return [computedTitular, ...computedDependentes]
  })

  const resumo = computed((): ICartSummary => {
    const [titular, ...dependentes] = items.value
    const qtdDependentes = cartUtils.formatNumber(dependentes.length)
    const totalVidas = cartUtils.formatNumber(count.value)
    const valorTotal = total.value
    const period = state.value.selectedPeriodType

    return { titular, dependentes, qtdDependentes, totalVidas, valorTotal, period }
  })

  return {
    state,

    addPlanoTitular,
    addDadosTitular,
    updateDadosTitular,
    addTitular,
    deleteTitular,
    deletePlanoTitular,

    addDependente,
    getDependente,
    updateDependente,
    updateDadosDependente,
    removerDependente,

    changePeriod,

    updateStepValidation,
    isValid,

    total,
    count,
    items,
    resumo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
