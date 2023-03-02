export type PaymentComponets = 'FormBoleto' | 'FormCreditCard'

export enum PaymentTypes {
  'BOLETO' = 'Boleto',
  'CARTAO_CREDITO' = 'CreditCard',
}
export interface IPaymentMethod {
  text: string
  value: PaymentTypes
}

export interface State {
  companyPaymentMethods: IPaymentMethod[]
}

export type DynamicPaymentComponent = Partial<Record<PaymentTypes, any>>
