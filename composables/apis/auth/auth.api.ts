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

  return { generateToken, validateToken }
}
