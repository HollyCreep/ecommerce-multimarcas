import * as YUP from 'yup'

YUP.setLocale({
  mixed: {
    default: ({ path }) => `O campo ${path} não é válido`,
    required: ({ path }) => `O campo ${path} é obrigatório`,
  },
  string: {
    email: 'O campo email não é válido',
  },
})

// @ts-expect-error Yup Module augmantation/declaration not working properly.
YUP.addMethod(YUP.string, 'cpf', function (errorMessage = 'CPF inválido') {
  return this.test('cpf-test', errorMessage, function (cpf: string) {
    const { path, createError } = this
    cpf = cpf.replace(/\D/g, '')
    if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf))
      return createError({ path, message: errorMessage })
    let result = true;
    [9, 10].forEach((j) => {
      let soma = 0
      let r = 0
      cpf.split(/(?=)/).splice(0, j).forEach((e, i) => {
        soma += parseInt(e) * ((j + 2) - (i + 1))
      })
      r = soma % 11
      r = (r < 2) ? 0 : 11 - r
      if (r !== +cpf.substring(j, j + 1))
        result = false
    })
    return result ?? createError({ path, message: errorMessage })
  })
})
// @ts-expect-error Yup Module augmantation/declaration not working properly.
YUP.addMethod(YUP.string, 'cnpj', function (errorMessage = 'CNPJ inválido') {
  return this.test('cnpj-test', errorMessage, function (cnpj: string) {
    const { path, createError } = this

    const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    cnpj = cnpj.replace(/[^\d]/g, '')
    const r = /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/
    if (!cnpj || cnpj.length !== 14 || r.test(cnpj))
      return createError({ path, message: errorMessage })

    const c = cnpj.split('')
    let i = 0
    let n = 0

    for (i = 0, n = 0; i < 12; i++)
      n += +c[i] * b[i + 1]

    n = 11 - n % 11
    n = n >= 10 ? 0 : n
    if (parseInt(c[12]) !== n)
      return createError({ path, message: errorMessage })

    for (i = 0, n = 0; i <= 12; i++)
      n += +c[i] * b[i]

    n = 11 - n % 11
    n = n >= 10 ? 0 : n
    if (parseInt(c[13]) !== n)
      return createError({ path, message: errorMessage })

    return true
  })
})

export default YUP
