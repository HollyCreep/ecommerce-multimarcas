import type { ICustomer } from '~~/types/product'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(null)
  const user = ref<ICustomer>(null)

  const authenticate = async () => {
    const { authenticate } = useAuthApi()
    const { data, error } = await authenticate()

    if (error.value)
      Promise.reject(error.value)

    data.value.token && (token.value = data.value.token)
  }

  const login = async (credentials: { login: string; senha: string }): Promise<ICustomer> => {
    const { login } = useAuthApi()
    const { data, error } = await login(credentials)

    if (error.value)
      return Promise.reject(error.value)

    data.value && (user.value = data.value)

    return user.value
  }

  return { token, user, authenticate, login }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
