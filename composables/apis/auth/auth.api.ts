import type { ITitular } from '~~/types/customer'

export const useAuthApi = () => {
  const { public: { baseUrl } } = useRuntimeConfig()
  const { getActiveBrandBasicToken } = useThemeController()
  const basic = getActiveBrandBasicToken()

  const validateToken = (token: string) => useFetch<{ brand: number; tokenValidate: boolean }>(() => `${baseUrl}/authenticate/validtoken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    server: false,
  })

  const generateToken = () => useFetch<{ token: string }>(() => `${baseUrl}/authenticate/token`, {
    headers: {
      Authorization: `Basic ${basic}`,
    },
    method: 'POST',
    server: false,
    parseResponse: res => JSON.parse(res),
  })

  const login = (credentials: { login: string; senha: string }, token: string) => useFetch<{ user: ITitular }>(() => `${baseUrl}/authenticate/login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: credentials,
    server: false,
  })

  return { login, generateToken, validateToken }
}
