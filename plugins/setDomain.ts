import { Brands } from '~/types/enums'

export default defineNuxtPlugin(({ hook }) => {
  hook('vue:setup', () => {
    const { changeTheme } = useThemeController()
    const { domain } = useAppConfig()
    const headers = useRequestHeaders()
    const url
      = (process.server && headers.host) ? headers.host : window.location.host
    let brand
      = (process.dev && domain) ? domain : Brands.ODONTO_PREV

    if (url.includes('system'))
      brand = Brands.ODONTO_SYSTEM

    changeTheme(brand)
  })
})
