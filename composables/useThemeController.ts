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

  const getColor = (cor: string) => {
    try {
      const [color] = cor.replace('-', '').split(' ')
      return (
        theme.global.current.value.colors?.[color]
        || theme.themes.value?.[activeBrand.value.name].colors?.[color]
        || theme.themes.value.light.colors?.[color]
        || theme.themes.value.light.colors?.[cor]
        || color
      )
    }
    catch (error) {
      return cor
    }
  }

  return { changeTheme, getColor }
}
