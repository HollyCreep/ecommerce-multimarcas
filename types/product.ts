import type { Awnser, Period } from '.'
export interface ICobertura {
  cobertura: string
  [x: string]: any
}

export interface IEspecialidade {
  nome: string
  codigo: number
  codigoPlano: number
  diasCarencia: number
}

export interface IPlan {
  nomeFantasia: string
  registroAns: string
  codigoPlano: number
  tipoNegociacao: Period
  valorTitular: number
  valorDependente: number
  coParticipacao: Awnser
  especialidades: IEspecialidade[]
}

export interface IProduct {
  nome: string
  faxaEtaria?: string
  sku: string
  destaque: boolean
  mais_vendido: boolean
  vantagens: string
  coberturas: ICobertura[]
  logo: string
  planos: IPlan[]
}

export interface IAddress {
  cep: string
  logradouro: string
  numero: string | number
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export interface ICustomer {
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
