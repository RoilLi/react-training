import { db } from './db'
import { rest } from 'msw'
import { nanoid } from '@reduxjs/toolkit'

const token = nanoid()

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          first_name: 'Test',
          last_name: 'User',
        },
        token,
      })
    )
  }),
  ...db.device.toHandlers('rest'),
]

console.log(...db.device.toHandlers('rest'))
