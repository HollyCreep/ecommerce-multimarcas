// src/mocks/handlers.js
import authMock from './auth.mock'
import productsMock from './products.mock'
export const handlers = [
  ...authMock,
  ...productsMock,
]
