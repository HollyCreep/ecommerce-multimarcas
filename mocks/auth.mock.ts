// src/mocks/handlers.js
import { rest } from 'msw'

const BASIC_ODONTOPREV = 'ZjBiZmE3NDhhNWQ1MTViODdmYThmZDg2NDM5ZWMwNTE=MjQzYWIzNTYzNDBlODU5MmFjNmI1ODdjOGExNmU2YWQ2NGU0MDAxMg=='
const BASIC_BB = 'NmUzYTdlMjkyMGI5NmM5NGEwM2QwYjgxNmQ0MDdmNzg=MWMxMDBjZGJlYzAzYzM3ZWNlZGNhOTJjODVlNzk4NWIxZTA5ZWMwYg=='

export default [
  rest.post('https://api.odontoprev.com.br:8243/authenticate/token', (req, res, ctx) => {
    let token = ''
    const basic = req.headers.get('Authorization')

    switch (basic) {
      case BASIC_ODONTOPREV:
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJicmFuZCI6Ik9kb250b3ByZXYiLCJleHAiOjE2Nzc2MTAyODUsImlhdCI6MTY3NzYwNjY4NX0.uUeJAU7xwBN0U9mYJf9p6EO-wPTu8p5v54ZOJH_Xi6M'
        break
      case BASIC_BB:
        token = 'NmUzYTdlMjkyMGI5NmM5NGEwM2QwYjgxNmQ0MDdmNzg=MWMxMDBjZGJlYzAzYzM3ZWNlZGNhOTJjODVlNzk4NWIxZTA5ZWMwYg=='
        break

      default:
        token = null
        break
    }

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'Invalid Credentials',
        }),
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        token,
      }),
    )
  }),

]
