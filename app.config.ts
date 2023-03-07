import { Brands } from './types/enums'

export default defineAppConfig({
  domain: Brands.ODONTO_PREV,
  baseUrl: 'https://api.odontoprev.com.br:8243',
  basicTokens: {
    odontoPrev: 'ZjBiZmE3NDhhNWQ1MTViODdmYThmZDg2NDM5ZWMwNTE=MjQzYWIzNTYzNDBlODU5MmFjNmI1ODdjOGExNmU2YWQ2NGU0MDAxMg==',
    odontoSystem: '',
    bbDental: 'NmUzYTdlMjkyMGI5NmM5NGEwM2QwYjgxNmQ0MDdmNzg=MWMxMDBjZGJlYzAzYzM3ZWNlZGNhOTJjODVlNzk4NWIxZTA5ZWMwYg==',
  },
  basicTokenBFF: 'dUd0QnRwdWJpZWJMUmdjRzNWSDlmNXJoX1dFYTowclpzRjAwQllvc19oR0RpMmJ0X0I2WHFiUk1h',
})
