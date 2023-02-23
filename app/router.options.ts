import type { RouterConfig } from '@nuxt/schema'

const config: RouterConfig = {
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition)
      return savedPosition

    if (to.hash && to.path === from.path) {
      const el = document.querySelector(to.hash) as HTMLElement | null

      return { top: el?.offsetTop || 0, left: 0, behavior: 'smooth' }
    }

    return {
      top: 0,
      left: 0,
    }
  },
}
export default config
