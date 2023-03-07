import type { ICobrarCartaoDTO, IPaymentMethod, ITokenizarCartaoDTO } from '~~/types/payment'

export const useCartPaymentApi = () => {
  const { public: { baseUrl, baseUrlBFF, basicTokenBFF } } = useRuntimeConfig()

  const generateTokenBFF = () =>
    useFetch<{ access_token: string; scope: string; token_type: string; expires_in: number }>(() => `${baseUrlBFF}/token`, {
      headers: {
        Authorization: `Basic ${basicTokenBFF}`,
      },
      method: 'POST',
      server: false,
    })

  const getCompanyAvaiblePaymentMethods = async () => {
    try {
      const { getToken } = useAuthStore()
      const token = await getToken()
      return useFetch<IPaymentMethod[]>(() => `${baseUrl}/payment/available`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const gerarNumeroProposta = (token: string) =>
    useFetch<{ numeroProposta: string }>(() => `${baseUrlBFF}/dcss/vendas/1.0/propostas/numero/canal/7073`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  const generateTokenBrasspag = (numeroProposta: string, token: string) =>
    useFetch<{ sucesso: number; mensagem?: string; accessToken: string }>(() => `${baseUrlBFF}/mip/1.0/captura/ticket/acessar/EcommercePFOdonto/${numeroProposta}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  const tokenizarCartao = (params: ITokenizarCartaoDTO) =>
    useFetch<IPaymentMethod[]>(() => 'https://transactionsandbox.pagador.com.br/post/api/public/v1/card', {
      body: params,
      method: 'POST',
      server: false,
    })

  const cobrarCartao = (params: ICobrarCartaoDTO, token: string) =>
    useFetch<IPaymentMethod[]>(() => `${baseUrlBFF}/mip/1.0/captura/ticket/cobrar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: params,
      method: 'POST',
      server: false,
    })

  return { getCompanyAvaiblePaymentMethods, generateTokenBFF, gerarNumeroProposta, generateTokenBrasspag, tokenizarCartao, cobrarCartao }
}
