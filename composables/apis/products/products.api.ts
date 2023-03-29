import type { RequestOptions } from '../apiWrapper.api'
import type { IProduct } from '~~/types/product'

export const useProductsApi = () => {
  const api = useApi()

  const fetchProducts = (options?: RequestOptions<IProduct[]>) => api.get<IProduct[]>('/products', options)
  const getProduct = (sku: number | string, options?: RequestOptions<IProduct>) => api.get<IProduct>(`/products/${sku}`, options)

  return { getProduct, fetchProducts }
}
