import type { IProduct } from '~~/types/product'

export const useProductsApi = () => {
  const { public: { baseUrl } } = useRuntimeConfig()

  const fetchProducts = () => useFetch<IProduct[]>(`${baseUrl}/products`)
  const getProduct = (sku: number | string) => useFetch<IProduct>(`${baseUrl}/products/${sku}`)

  return { getProduct, fetchProducts }
}
