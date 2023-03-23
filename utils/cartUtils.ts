import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

function getRouteStep(cartRoute: CartRoute) {
  try {
    return Object.values(CART_ROUTES).findIndex(step => step === cartRoute)
  }
  catch (error) {
    return -1
  }
}

function formatNumber(number: number): string {
  return number < 10 ? `0${number}` : `${number}`
}

function convertNumberToAPIFormat(number: number): string {
  const base10Number = number < 10 ? `0${number}` : `${number}`
  const formatedString = base10Number.replaceAll(',', '').replaceAll('.', '')

  return formatedString.padEnd(4, '0')
}

function calcIdade(data: string) {
  const d = new Date()
  const ano_atual = d.getFullYear()
  const mes_atual = d.getMonth() + 1
  const dia_atual = d.getDate()
  const split = data.split('/')
  const novadata = `${split[1]}/${split[0]}/${split[2]}`
  const data_americana = new Date(novadata)
  const vAno = data_americana.getFullYear()
  const vMes = data_americana.getMonth() + 1
  const vDia = data_americana.getDate()
  const ano_aniversario = +vAno
  const mes_aniversario = +vMes
  const dia_aniversario = +vDia
  let quantos_anos = ano_atual - ano_aniversario
  if (((mes_atual < mes_aniversario) || (mes_atual === mes_aniversario)) && (dia_atual < dia_aniversario))
    quantos_anos--

  return quantos_anos < 0 ? 0 : quantos_anos
}

function isMenorDeIdade(data: string) {
  const idade = calcIdade(data)

  return idade < 18
}

export default {
  getRouteStep,
  formatNumber,
  convertNumberToAPIFormat,
  calcIdade,
  isMenorDeIdade,
}
