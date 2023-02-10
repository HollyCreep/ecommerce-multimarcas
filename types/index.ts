import type { Brands, Companies } from './enums'
import type { IBanner } from '~~/components/composables/Banner.vue'

export interface IResources {
  components?: {
    banner?: IBanner
  }
}

export interface IThemeStore {
  name: Brands
  friendly_name: Companies
//   resources: IResources
}

export interface ExternalLink {
  href: string
  text: string
  [x: string]: any
}

export interface NuxtLink {
  text: string
  children?: NuxtLink[]
  [x: string]: any
}

export type Awnser = 'S' | 'N'
export type Period = 'MENSAL' | 'ANUAL'
export type Link = NuxtLink | ExternalLink
