export type Sistema = 'EcommercePFOdonto'

export enum PaymentTypes {
  'Cartao de Credito' = 1,
  'Debito em conta',
  'Boleto',
}

export type PaymentName = keyof typeof PaymentTypes
export interface IPaymentMethod {
  id: PaymentTypes
  name: PaymentName
  system: Sistema
  installments?: number[]
}

export interface State {
  companyPaymentMethods: IPaymentMethod[]
}

export type CreditCardBrands = 'visa' | 'master' | 'amex' | 'elo'

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
