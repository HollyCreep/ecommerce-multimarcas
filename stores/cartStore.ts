import { defineStore } from 'pinia'
import type { ICustomer, IPlan } from '~~/types/product'
import { CartSteps } from '~/types/enums'

interface CartContent {
  customer: ICustomer
  plan: IPlan
}

interface CartStore {
  step: CartSteps
  titular: CartContent | Partial<CartContent>
  dependentes: CartContent[]
}

const defaultValues: CartStore = {
  step: CartSteps.titular,
  titular: {},
  dependentes: [],
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref(useLocalStorage<CartStore>('cart', defaultValues))

  /* --------------------------------- Titular -------------------------------- */
  const addPlanoTitular = (payload: IPlan) => {
    cart.value.titular.plan = payload
  }
  const addDadosTitular = (payload: ICustomer) => {
    cart.value.titular.customer = payload
  }
  const updateDadosTitular = (payload: Partial<ICustomer>) => {
    if (!cart.value.titular.customer)
      return new Error('Preencha todos os dados do titular')
    cart.value.titular.customer = { ...cart.value.titular.customer, ...payload }
  }
  const addTitular = (payload: CartContent) => {
    cart.value.titular = payload
  }
  const deleteTitular = () => {
    cart.value.titular = {}
    cart.value.dependentes = []
  }
  const deletePlanoTitular = () => {
    cart.value.titular.plan = undefined
  }

  /* ------------------------------- Dependentes ------------------------------ */
  const addDependente = (payload: CartContent) => {
    cart.value.dependentes.push(payload)
  }
  const updateDadosDependente = (payload: Partial<ICustomer>, index: number) => {
    const dependente = cart.value.dependentes[index]

    if (!dependente)
      return new Error('Dependente não encontrado')
    cart.value.dependentes[index] = { ...dependente, ...payload }
  }
  const removerDependente = (index: number) => {
    cart.value.dependentes.splice(index, 1)
  }

  /* --------------------------------- Getters -------------------------------- */
  const total = computed(() => {
    if (!cart.value.titular?.plan)
      return 0

    const totalDependentes = Object.values(cart.value.dependentes).reduce((acc, { plan }) => {
      const valorDependente = plan?.valorDependente || 0
      return acc + valorDependente
    }, 0)

    return cart.value.titular.plan.valorTitular + totalDependentes
  })

  const count = computed(() => {
    const { titular, dependentes } = cart.value
    return Number(!!titular.plan) + dependentes.length
  })

  const items = computed(() => {
    const { titular, dependentes } = cart.value
    if (!titular.plan)
      return []

    const planoTitular = { ...titular.plan, valor: titular.plan.valorTitular, delete: deletePlanoTitular }
    const planosDependentes = Object.values(dependentes).map(({ plan }, i) => ({ ...plan, valor: plan.valorDependente, delete: () => removerDependente(i) }))
    return [planoTitular, ...planosDependentes]
  })

  return {
    cart,

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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
