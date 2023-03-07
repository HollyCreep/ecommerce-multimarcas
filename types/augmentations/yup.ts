declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    cpf(errorMessage?: string): this
    cnpj(errorMessage?: string): this
    cardNumber(errorMessage?: string): this
    cardExpiry(errorMessage?: string): this
    cardCVV(errorMessage?: string): this
  }
}

export {}
