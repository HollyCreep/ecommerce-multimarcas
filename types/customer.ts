import type { IAddress } from './product'

export interface ITitular {
  email: string
  telefone: string
  nome: string
  data_nascimento: string
  cpf: string
  rg: string
  exp: string
  nome_mae?: string
  endereco: IAddress
  senha?: string
}

export interface IDependente {
  nome: string
  data_nascimento: string
  cpf: string
  rg: string
  exp: string
  nome_mae?: string
}

export type ICustomer = ITitular | IDependente
