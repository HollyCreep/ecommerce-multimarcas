import type { IPaymentMethod } from '~~/types/payment'

export const useCartPaymentApi = () => {
  const { public: { baseUrl, baseUrlBFF, basicTokenBFF } } = useRuntimeConfig()
  const api = useApi()

  // const generateTokenBFF = () => api.get('/token', { baseURL: baseUrlBFF, headers: { Authorization: `Basic ${basicTokenBFF}` } })

  const getCompanyAvaiblePaymentMethods = () => api.get<IPaymentMethod[]>('/payment/available')

  // const gerarNumeroProposta = (token: string) =>
  //   useFetch<{ numeroProposta: string }>(() => `${baseUrlBFF}/dcss/vendas/1.0/propostas/numero/canal/7073`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  // const generateTokenBrasspag = (numeroProposta: string, token: string) =>
  //   useFetch<{ sucesso: number; mensagem?: string; accessToken: string }>(() => `${baseUrlBFF}/mip/1.0/captura/ticket/acessar/EcommercePFOdonto/${numeroProposta}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  // const tokenizarCartao = (params: ITokenizarCartaoDTO) =>
  //   useFetch<IPaymentMethod[]>(() => 'https://transactionsandbox.pagador.com.br/post/api/public/v1/card', {
  //     body: params,
  //     method: 'POST',
  //     server: false,
  //   })

  // const cobrarCartao = (params: ICobrarCartaoDTO, token: string) =>
  //   useFetch<IPaymentMethod[]>(() => `${baseUrlBFF}/mip/1.0/captura/ticket/cobrar`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: params,
  //     method: 'POST',
  //     server: false,
  //   })

  return { getCompanyAvaiblePaymentMethods }
}
