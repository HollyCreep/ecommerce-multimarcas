import type { ITitular } from '~~/types/customer'

export const useAuthApi = () => {
  const { baseUrl } = useAppConfig()
  const { getActiveBrandBasicToken } = useThemeController()
  const basic = getActiveBrandBasicToken()

  const validateToken = (token: string) => useFetch<{ brand: number; tokenValidate: boolean }>(() => `${baseUrl}/authenticate/validtoken`, {
    headers: {
      authentication: `Bearer ${token}`,
    },
    method: 'POST',
    server: false,
  })

  const generateToken = () => useFetch<{ token: string }>(() => `${baseUrl}/authenticate/token`, {
    headers: {
      authentication: `Basic ${basic}`,
    },
    method: 'POST',
    server: false,
  })

  const login = (credentials: { login: string; senha: string }, token: string) => useFetch<{ user: ITitular }>(() => `${baseUrl}/authenticate/login`, {
    headers: {
      authentication: `Bearer ${token}`,
    },
    method: 'POST',
    body: credentials,
    server: false,
  })

  return { login, generateToken, validateToken }
}
