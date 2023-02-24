import type { Brands } from '../enums'

declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    cpf(errorMessage?: string): this
    cnpj(errorMessage?: string): this
  }
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    domain?: Brands
  }
}

export {}
