import type { IProduct } from '~~/types/product'

export const useProductsApi = () => {
  const { baseUrl } = useAppConfig()

  const fetchProducts = () => useFetch<IProduct[]>(`${baseUrl}/products`)
  const getProduct = (id: number | string) => useFetch<IProduct>(`${baseUrl}/products/${id}`)

  return { getProduct, fetchProducts }
}
