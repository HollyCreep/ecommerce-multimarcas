export enum PaymentTypes {
  'BOLETO' = 'Boleto',
  'CARTAO_CREDITO' = 'CreditCard',
}
export interface IPaymentMethod {
  id: string
  name: PaymentTypes
  installments?: number
}

export interface State {
  companyPaymentMethods: IPaymentMethod[]
}

export type CreditCardBrands =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'elo'

export interface ICreditCard {
  RawNumber: string
  Expiration: string
  SecurityCode: string
  HolderName: string
}

export interface IFormCreditCard extends ICreditCard {
  parcelas: number
}

export interface ITokenizarCartaoDTO extends ICreditCard {
  AccessToken: string
}

type Sistema = 'EcommercePFOdonto'

export interface ICobrarCartaoDTO {
  nome: string
  paymentToken: string
  prestacoes: number
  proposta: string
  sistema: Sistema
  valor: number
}

export type DynamicPaymentComponent = Partial<Record<PaymentTypes, any>>
