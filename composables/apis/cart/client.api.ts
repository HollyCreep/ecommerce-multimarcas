import type { RequestOptions } from '../apiWrapper.api'
import type { IDependente, IResponsavel, ITitular } from '~~/types/customer'

export interface ISaveAbandonedCartDTO {
  email: string
  phone: string
  planCode: number
  quantity: number
  price: number
  contactId?: number
}

interface ISaveAbandonedCartResponse { numberProposal: string; clientOrderId: number; contactId: number }
export interface ISaveClientDTO extends ITitular {
  order: number
  dependent: IDependente[]
  responsavel?: IResponsavel
}

interface ISaveClientResponse { status: string }

export const useCartClientApi = () => {
  const api = useApi()

  const saveAbandonedCart = (params: ISaveAbandonedCartDTO, options?: RequestOptions<ISaveAbandonedCartResponse>) => api.post<ISaveAbandonedCartResponse>('/cart/abandoned', {
    ...options,
    body: params,
  })

  const saveClient = (params: ISaveClientDTO, options?: RequestOptions<ISaveClientResponse>) => api.post<ISaveClientResponse>('/cart/client', {
    ...options,
    body: params,
  })

  return { saveAbandonedCart, saveClient }
}
