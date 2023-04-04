import { useCookies } from '@vueuse/integrations/useCookies'

export const useAuthStore = defineStore('auth', () => {
  const cookies = useCookies(['bearer'])
  const token = computed(() => cookies.get('bearer'))

  const { public: { baseUrl } } = useRuntimeConfig()
  const { getActiveBrandBasicToken } = useThemeController()
  const basic = getActiveBrandBasicToken()

  const generateTokenRequest = () => {
    const { data } = useLazyFetch<{ token: string; expiration: number }>(() => `${baseUrl}/api/authenticate/token`, {
      headers: {
        Authorization: `Basic ${basic}`,
      },
      method: 'POST',
      server: false,
      parseResponse: res => JSON.parse(res),
    })

    watch(data, ({ token: responseToken, expiration }) => {
      cookies.set('bearer', responseToken, { maxAge: expiration })
    })
  }

  if (!token.value)
    generateTokenRequest()

  const refreshToken = () => {
    try {
      cookies.remove('bearer')
      generateTokenRequest()
    }
    catch (error) {
      cookies.remove('bearer')
    }
  }

  return { token, refreshToken }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
