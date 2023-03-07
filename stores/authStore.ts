export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(null)

  const login = async (credentials: { login: string; senha: string }): Promise<void | Error> => {
    const { login } = useAuthApi()
    const { data, error } = await login(credentials, token.value)

    if (error.value)
      return Promise.reject(error.value)

    if (data.value) {
      const { addDadosTitular } = useCartStore()
      addDadosTitular(data.value.user)
    }
  }

  const getToken = async (): Promise<string> => {
    try {
      const { generateToken, validateToken } = useAuthApi()

      if (token.value) {
        const { data } = await validateToken(token.value)
        if (data.value.tokenValidate)
          return token.value
      }

      const { data } = await generateToken()
      if (data.value)
        token.value = data.value.token
      return token.value
    }
    catch (error) {
      console.error(error)
    }
  }

  return { login, getToken }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
