import { storeToRefs } from 'pinia'
import type { SearchParameters } from 'ofetch'
import type { NitroFetchRequest } from 'nitropack'
export interface RequestOptions<T> {
  key?: string
  method?: string
  query?: SearchParameters
  params?: SearchParameters
  body?: RequestInit['body'] | Record<string, any>
  headers?: Record<string, string> | [key: string, value: string][] | Headers
  baseURL?: string
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  default?: () => T
  transform?: (input: T) => T
  pick?: string[]
}

export const useApi = () => {
  function get<T>(request: NitroFetchRequest, options?: RequestOptions<T>) {
    const config = useRuntimeConfig()
    const store = useAuthStore()
    const { token } = storeToRefs(store)
    const shouldRetry = ref(true)

    // @ts-expect-error impossivel tipar essas options separadamente
    return useFetch(request, {
      baseURL: config.public.baseUrl,
      server: false,
      watch: [token],
      parseResponse: res => JSON.parse(res),
      ...options,
      onRequest({ options }) {
        const headers = options?.headers ? new Headers(options.headers) : new Headers()
        if (!headers.has('Authorization') && !!token.value)
          headers.set('Authorization', `Bearer ${token.value}`)

        options.headers = headers
      },
      onResponseError({ response }) {
        if (response.status === 401 && !!shouldRetry.value) {
          shouldRetry.value = false
          store.refreshToken()
        }
      },
    })
  }

  function post<T>(request: NitroFetchRequest, options?: RequestOptions<T>) {
    return get<T>(request, {
      ...options,
      method: 'POST',
    })
  }

  return { get, post }
}
