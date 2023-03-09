export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage<string>('bearer', null)

  const { public: { baseUrl } } = useRuntimeConfig()
  const { getActiveBrandBasicToken } = useThemeController()
  const basic = getActiveBrandBasicToken()

  const validateToken = (token: string) => useFetch<{ brand: number; tokenValidate: boolean }>(() => `${baseUrl}/authenticate/validtoken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    server: false,
    parseResponse: res => JSON.parse(res),
  })

  const generateToken = () => useFetch<{ token: string }>(() => `${baseUrl}/authenticate/token`, {
    headers: {
      Authorization: `Basic ${basic}`,
    },
    method: 'POST',
    server: false,
    parseResponse: res => JSON.parse(res),
  })

  const getToken = async (): Promise<string> => {
    try {
      if (token.value) {
        const { data: res } = await validateToken(token.value)
        if (res.value.tokenValidate)
          return token.value
      }

      const { data: res2 } = await generateToken()
      if (res2.value)
        token.value = res2.value.token
      return token.value
    }
    catch (error) {
      console.error(error)
    }
  }

  return { getToken }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
