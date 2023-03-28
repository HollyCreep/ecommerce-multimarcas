export type Sistema = 'EcommercePFOdonto'

export enum PaymentTypes {
  'BOLETO' = 'Boleto',
  'CARTAO_CREDITO' = 'CreditCard',
}
export interface IPaymentMethod {
  id: string
  name: PaymentTypes
  system: Sistema
  installments?: number[]
}

export interface State {
  companyPaymentMethods: IPaymentMethod[]
}

export type CreditCardBrands =
  | 'visa'
  | 'master'
  | 'amex'
  | 'elo'

export interface ICreditCard {
  RawNumber: string
  Expiration: string
  SecurityCode: string
  HolderName: string
}

export interface IFormCreditCard extends ICreditCard {
  installments: number
}

export type DynamicPaymentComponent = Partial<Record<PaymentTypes, any>>
