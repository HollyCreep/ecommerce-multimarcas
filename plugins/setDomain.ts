import { Brands } from '~/types/enums'

export default defineNuxtPlugin(({ hook }) => {
  hook('vue:setup', () => {
    const { changeTheme } = useThemeController()
    const appConfig = useAppConfig()
    const headers = useRequestHeaders()
    const url
      = (process.server && headers.host) ? headers.host : window.location.host
    let brand
      = (process.dev && appConfig.domain) ? appConfig.domain : Brands.ODONTO_PREV

    if (url.includes('system'))
      brand = Brands.ODONTO_SYSTEM

    changeTheme(brand)
  })
})
