import { useTheme } from 'vuetify'
import type { Brands } from '~~/types/enums'

export const useThemeController = () => {
  const theme = useTheme()
  const { setActiveBrand } = useThemeStore()

  const changeTheme = (newTheme: Brands) => {
    theme.global.name.value = newTheme
    setActiveBrand(newTheme)
  }

  return { changeTheme }
}
