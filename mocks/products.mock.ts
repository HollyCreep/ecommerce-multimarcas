// src/mocks/handlers.js
import { rest } from 'msw'

export default [
  rest.get('https://api.odontoprev.com.br:8243/products', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),

      ctx.json([
        {
          name: 'Flocos',
        },
        {
          name: 'Paçoca',
        },
        {
          name: 'Tobias',
        },
      ]),
    )
  }),
]
