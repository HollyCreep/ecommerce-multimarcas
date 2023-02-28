import { storeToRefs } from 'pinia'
import type { ICustomer } from '~~/types/product'

interface ILoginDTO {
  token: string
  expiration_date: Date | string
}

export const useAuthApi = () => {
  const { baseUrl } = useAppConfig()
  const store = useAuthStore()
  const { getActiveBrandBasicToken } = useThemeController()

  const basic = getActiveBrandBasicToken()
  const { token } = storeToRefs(store)

  const authenticate = () => useFetch<ILoginDTO>(() => `${baseUrl}/authenticate/token`, {
    headers: {
      authentication: `Basic ${basic}`,
    },
  })

  const login = (credentials: { login: string; senha: string }) => useFetch<ICustomer>(() => `${baseUrl}/authenticate/login`, {
    headers: {
      authentication: `Bearer ${token}`,
    },
    method: 'POST',
    body: credentials,
    server: false,
  })

  return { login, authenticate }
}
