import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

function getRouteStep(cartRoute: CartRoute) {
  try {
    return Object.values(CART_ROUTES).findIndex(step => step === cartRoute)
  }
  catch (error) {
    return -1
  }
}

export default {
  getRouteStep,
}
