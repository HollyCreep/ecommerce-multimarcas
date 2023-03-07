import type { ICobrarCartaoDTO, IPaymentMethod, ITokenizarCartaoDTO } from '~~/types/payment'

export const useCartPaymentApi = () => {
  const { baseUrl, basicTokenBFF } = useAppConfig()

  const generateTokenBFF = () =>
    useFetch<{ access_token: string; scope: string; token_type: string; expires_in: number }>(() => `${baseUrl}/token`, {
      headers: {
        authentication: `Basic ${basicTokenBFF}`,
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
          authentication: `Bearer ${token}`,
        },
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const gerarNumeroProposta = (token: string) =>
    useFetch<{ numeroProposta: string }>(() => `${baseUrl}/dcss/vendas/1.0/propostas/numero/canal/7073`, {
      headers: {
        authentication: `Bearer ${token}`,
      },
    })

  const generateTokenBrasspag = (numeroProposta: string, token: string) =>
    useFetch<{ sucesso: number; mensagem?: string; accessToken: string }>(() => `${baseUrl}/mip/1.0/captura/ticket/acessar/EcommercePFOdonto/${numeroProposta}`, {
      headers: {
        authentication: `Bearer ${token}`,
      },
    })

  const tokenizarCartao = (params: ITokenizarCartaoDTO) =>
    useFetch<IPaymentMethod[]>(() => 'https://transactionsandbox.pagador.com.br/post/api/public/v1/card', {
      body: params,
      method: 'POST',
      server: false,
    })

  const cobrarCartao = (params: ICobrarCartaoDTO, token: string) =>
    useFetch<IPaymentMethod[]>(() => `${baseUrl}/mip/1.0/captura/ticket/cobrar`, {
      headers: {
        authentication: `Bearer ${token}`,
      },
      body: params,
      method: 'POST',
      server: false,
    })

  return { getCompanyAvaiblePaymentMethods, generateTokenBFF, gerarNumeroProposta, generateTokenBrasspag, tokenizarCartao, cobrarCartao }
}
