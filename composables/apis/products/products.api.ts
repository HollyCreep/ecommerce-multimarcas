export const useProductsApi = () => {
  const { baseUrl } = useAppConfig()

  const getProducts = () => useFetch(() => `${baseUrl}/products`)

  return { getProducts }
}
