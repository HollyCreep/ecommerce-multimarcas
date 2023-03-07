import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import type { Brands } from '~~/types/enums'

export const useThemeController = () => {
  const themeStore = useThemeStore()

  const { setActiveBrand } = themeStore
  const { activeBrand } = storeToRefs(themeStore)

  const changeTheme = (newTheme: Brands) => {
    const theme = useTheme()

    theme.global.name.value = newTheme
    setActiveBrand(newTheme)
  }

  const getColor = (color: string) => {
    try {
      const theme = useTheme()

      return (
        theme.global.current.value.colors?.[color]
        || theme.themes.value?.[activeBrand.value.name].colors?.[color]
        || theme.themes.value.light.colors?.[color]
        || theme.themes.value.dark.colors?.[color]
        || color
      )
    }
    catch (error) {
      return color
    }
  }

  const getActiveBrandBasicToken = () => {
    try {
      const { public: { basicTokens } } = useRuntimeConfig()
      const brand = activeBrand.value.name
      return basicTokens[brand]
    }
    catch (error) {
      return null
    }
  }

  return { changeTheme, getColor, getActiveBrandBasicToken }
}
