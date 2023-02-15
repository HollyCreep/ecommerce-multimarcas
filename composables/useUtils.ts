export const useUtils = () => {
  function isNumber(n: any) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
  }

  function getValue(prop: string | number | undefined) {
    if (!prop)
      return undefined

    return isNumber(prop) ? `${prop}px` : prop
  }

  return { isNumber, getValue }
}
