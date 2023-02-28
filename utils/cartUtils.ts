import type { CartRoute } from '~~/types/cart'
import { CART_ROUTES } from '~~/types/cart'

function getRouteStep(cartRoute: CartRoute) {
  try {
    const [step] = Object.entries(CART_ROUTES).find(([_step, route]) => route === cartRoute)
    return +step
  }
  catch (error) {
    return -1
  }
}

function getActiveRouteStep() {
  const route = useRoute()
  let active = 0
  Object.entries(CART_ROUTES).forEach(([step, cartRoute]) => {
    if (cartRoute === route.path)
      active = +step
  })

  return active
}

export default {
  getRouteStep,
  getActiveRouteStep,
}
