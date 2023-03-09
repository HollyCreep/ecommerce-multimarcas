import type { NitroFetchRequest } from 'nitropack'
import type { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import type { UseFetchOptions } from '#app'

type RequestOptions<T> = UseFetchOptions<
T extends void ? unknown : T,
(res: T extends void ? unknown : T) => T extends void ? unknown : T,
KeyOfRes<
    (res: T extends void ? unknown : T) => T extends void ? unknown : T
>
>
| undefined

export const useApi = () => {
  async function get<T>(request: NitroFetchRequest, opts?: RequestOptions<T>) {
    const config = useRuntimeConfig()
    const { getToken } = useAuthStore()
    const token = await getToken()

    return useFetch<T>(request, {
      baseURL: config.public.baseUrl,
      ...opts,
      onRequest({ request, options }) {
        const headers = options?.headers ? new Headers(options.headers) : new Headers()

        if (!headers.has('Authorization') && !!token)
          headers.set('Authorization', `Bearer ${token}`)

        options.headers = headers
      },
      onRequestError({ request, options, error }) {
        console.error(error)
      },
      onResponse({ request, response, options }) {
        return response._data
      },
      onResponseError({ request, response, options }) {
        console.error('[fetch response error]', request, response.status, response.body)
      },
    })
  }

  function post<T>(request: NitroFetchRequest, opts?: RequestOptions<T>) {
    return get(request, {
      ...opts,
      method: 'POST',
    })
  }

  return { get, post }
}
