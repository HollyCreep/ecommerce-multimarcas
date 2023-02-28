export enum CartSteps {
  titular,
  dependente,
  checkout,
}

export const CART_ROUTES = {
  [CartSteps.titular]: '/carrinho/titular',
  [CartSteps.dependente]: '/carrinho/dependente',
  [CartSteps.checkout]: '/carrinho/checkout',
} as const

export type CartRoute = typeof CART_ROUTES[CartSteps]

export type PaymentComponets = 'FormBoleto' | 'FormCreditCard'

export enum PaymentTypes {
  'BOLETO' = 'FormBoleto',
  'CARTAO_CREDITO' = 'FormCreditCard',
}
export interface IPaymentMethod {
  text: string
  value: PaymentTypes
}

export interface State {
  companyPaymentMethods: IPaymentMethod[]
}
