import type { IEspecialidade, IProduct } from './product'
import type { IDependente, ITitular } from './customer'
import type { PaymentTypes } from './payment'
import type { Awnser, Period } from '.'

export const CART_ROUTES = {
  titular: '/carrinho/titular',
  dependente: '/carrinho/dependente',
  checkout: '/carrinho/checkout',
} as const

export type CartSteps = keyof typeof CART_ROUTES
export type CartRoute = typeof CART_ROUTES[CartSteps]

export interface ICartStepItem {
  text: string
  step: CartSteps
  valid?: boolean
  required?: boolean
}

export interface ComputedCartItem {
  valor: number
  logo: string
  nomeFantasia: string
  registroAns: string
  codigoPlano: number
  tipoNegociacao: Period
  valorTitular: number
  valorDependente: number
  coParticipacao: Awnser
  especialidades: IEspecialidade[]
  delete: () => void
}

export interface CartTitular {
  customer?: ITitular
  product?: IProduct
}

export interface CartDependente {
  customer: IDependente
  product: IProduct
}

export interface CartStore {
  selectedPeriodType: Period
  paymentMethod: PaymentTypes
  titular: CartTitular
  dependentes: CartDependente[]
}
