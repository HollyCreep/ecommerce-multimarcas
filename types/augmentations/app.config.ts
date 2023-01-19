import type { Brands } from '../enums'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    domain?: Brands
  }
}

export {}
