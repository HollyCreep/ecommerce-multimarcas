import type { NitroFetchRequest } from 'nitropack'
import type { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import { storeToRefs } from 'pinia'
import type { UseFetchOptions } from '#app'

export type RequestOptions<T> = UseFetchOptions<
T extends void ? unknown : T,
(res: T extends void ? unknown : T) => T extends void ? unknown : T,
KeyOfRes<
    (res: T extends void ? unknown : T) => T extends void ? unknown : T
>
>
| undefined

export const useApi = () => {
  function get<T>(request: NitroFetchRequest, options?: RequestOptions<T>) {
    const config = useRuntimeConfig()
    const store = useAuthStore()
    const { token } = storeToRefs(store)
    const shouldRetry = ref(true)

    return useFetch<T>(request, {
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
      onResponseError({ response, error }) {
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
