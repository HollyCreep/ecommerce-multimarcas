export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(null)

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

  return { getToken }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
