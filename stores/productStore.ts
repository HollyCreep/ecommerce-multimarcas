import { StorageSerializers } from '@vueuse/core'
import type { IProduct } from '~~/types/product'

export const useProductStore = defineStore('product', () => {
  const product = useLocalStorage<IProduct>('staged_product', null, { serializer: StorageSerializers.object })
  const featuredProducts = useLocalStorage<IProduct[]>('featured_products', [], { serializer: StorageSerializers.object })

  const getProduct = async (id: string): Promise<IProduct> => {
    const { getProductFriendlyName } = useUtils()
    if (!product.value || (product.value.sku !== id && getProductFriendlyName(product.value.nome) !== id)) {
      const { getProduct } = useProductsApi()
      const { data, error } = await getProduct(id)

      if (!error.value && data.value)
        product.value = data.value
    }

    return product.value
  }

  const getFeaturedProducts = async (): Promise<IProduct[]> => {
    if (!featuredProducts.value.length) {
      const { fetchProducts } = useProductsApi()
      const { data, error } = await fetchProducts()

      if (!error.value && data.value)
        featuredProducts.value = data.value
    }

    return featuredProducts.value
  }

  return { product, featuredProducts, getProduct, getFeaturedProducts }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
