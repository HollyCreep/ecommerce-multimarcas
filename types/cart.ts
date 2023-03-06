import type { IPlan, IProduct } from './product'
import type { ICustomer, IDependente, ITitular } from './customer'
import type { PaymentTypes } from './payment'
import type { Period } from '.'

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

export interface IComputedCartPLan extends IPlan {
  valor: number
  logo: string
}

export interface IComputedCartItem {
  plan: IComputedCartPLan
  customer: ICustomer
  delete: (params?: any) => void
  update: (params?: any) => void
}

export interface ICartSummary {
  titular: IComputedCartItem
  dependentes: IComputedCartItem[]
  qtdDependentes: number | string
  totalVidas: number | string
  valorTotal: number
  period: Period
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
  steps: ICartStepItem[]
}
