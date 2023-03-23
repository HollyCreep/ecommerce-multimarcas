export type Sexo = 'm' | 'f'
export type Gender = 'MASCULINO' | 'FEMININO'
export interface IAddress {
  zipCode: string
  address: string
  number: string | number
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface ITitular {
  name: string
  birthdate: string
  cpf: string
  rg: string
  documentIssue: string
  motherName?: string
  gender: Gender
  email: string
  phone: string

  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface IDependente {
  nome: string
  cpf: string
  data_nascimento: string
  rg: string
  exp: string
  nome_mae?: string
  gender: Gender
}

export interface IResponsavel {
  nome: string
  cpf: string
  sexo: Sexo
  dataNascimento: string
  celular: string
  email: string
  gender: Gender
}

export type ICustomer = ITitular | IDependente
