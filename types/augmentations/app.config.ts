import type { Brands } from '../enums'

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    cpf(errorMessage?: string): this
    cnpj(errorMessage?: string): this
    cardNumber(errorMessage?: string): this
    cardExpiry(errorMessage?: string): this
    cardCVV(errorMessage?: string): this
  }
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    domain?: Brands
    baseUrl?: string
    basicTokens?: Record<Brands, string>
    basicTokenBFF?: string
  }
}

export {}
