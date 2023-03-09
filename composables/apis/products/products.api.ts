import type { IProduct } from '~~/types/product'

export const useProductsApi = () => {
  const api = useApi()

  const fetchProducts = () => api.get<IProduct[]>('/products')
  const getProduct = (sku: number | string) => api.get<IProduct>(`/products/${sku}`)

  return { getProduct, fetchProducts }
}
