export const useUtils = () => {
  function isNumber(n: any) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
  }

  function getValue(prop: string | number | undefined) {
    if (!prop)
      return undefined

    return isNumber(prop) ? `${prop}px` : prop
  }

  function getProductFriendlyName(name: string) {
    return name.replaceAll(' ', '-').toLowerCase()
  }

  return { isNumber, getValue, getProductFriendlyName }
}
