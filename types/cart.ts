export enum CartSteps {
  'Titular',
  'Dependente',
  'Checkout',
}

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
