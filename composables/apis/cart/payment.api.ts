import type { RequestOptions } from '../apiWrapper.api'
import type { CreditCardBrands, ICreditCard, IPaymentMethod, Sistema } from '~~/types/payment'

export interface ISaveAbandonedCartParams {
  email: string
  phone: string
  planCode: number
  quantity: number
  price: number
}

export interface IGeneratePaymentTokenResponse {
  sucesso: number
  accessToken: string
  mensagem?: string
}

export interface ITokenizarCartaoDTO extends ICreditCard {
  AccessToken: string
}

interface ITokenizarCartaoResponse { PaymentToken: string }

export interface ISaveCreditCardTokenLogDTO {
  order: number
  PaymentToken: string
}

interface ISaveCreditCardTokenLogResponse { PaymentToken: string }

export interface ICobrarCartaoDTO {
  flag: CreditCardBrands
  cpf: string
  name: string
  paymentToken: string
  installments: number
  proposal: string
  system: Sistema
  price: string
}

interface ICobrarCartaoResponse { sucesso: number; mensagem: string }

export const useCartPaymentApi = () => {
  const api = useApi()
  const namespace = '/payment'

  const getCompanyAvaiblePaymentMethods = (options?: RequestOptions<IPaymentMethod[]>) => api.get<IPaymentMethod[]>(`${namespace}/available`, options)

  const generatePaymentToken = (numeroProposta: string, options?: RequestOptions<IGeneratePaymentTokenResponse>) => api.post<IGeneratePaymentTokenResponse>(`${namespace}/token`, { ...options, body: { proposal: numeroProposta } })

  const tokenizarCartao = (params: ITokenizarCartaoDTO, options?: RequestOptions<ITokenizarCartaoResponse>) => api.post<ITokenizarCartaoResponse>('/post/api/public/v1/card', {
    ...options,
    baseURL: 'https://transactionsandbox.pagador.com.br',
    body: params,
  })

  const saveCreditCardTokenLog = (params: ISaveCreditCardTokenLogDTO, options?: RequestOptions<ISaveCreditCardTokenLogResponse>) => api.post<ISaveCreditCardTokenLogResponse>(`${namespace}/token/card/log`, { ...options, body: params })

  const cobrarCartao = (params: ICobrarCartaoDTO, options?: RequestOptions<ICobrarCartaoResponse>) => api.post<ICobrarCartaoResponse>(`${namespace}/credit/pay`, { ...options, body: params })

  return { getCompanyAvaiblePaymentMethods, generatePaymentToken, tokenizarCartao, saveCreditCardTokenLog, cobrarCartao }
}
