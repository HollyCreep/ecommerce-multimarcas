// src/mocks/handlers.js
import { rest } from 'msw'
import authMock from './auth.mock'
import productsMock from './products.mock'
export const handlers = [
  ...authMock,
  ...productsMock,
  rest.get('https://api.nuxtjs.dev/mount', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),

      ctx.json([
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
