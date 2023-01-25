import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'
import type { Brands } from '~~/types/enums'

export const useThemeController = () => {
  const theme = useTheme()
  const themeStore = useThemeStore()

  const { setActiveBrand } = themeStore
  const { activeBrand } = storeToRefs(themeStore)

  const changeTheme = (newTheme: Brands) => {
    theme.global.name.value = newTheme
    setActiveBrand(newTheme)
  }

  const getColor = (color: string) => {
    try {
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

  return { changeTheme, getColor }
}
