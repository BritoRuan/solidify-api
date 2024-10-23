import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/infra/http/middlewares/verifyJwt'
import { authenticate } from './sessionUserController'
import { register } from './registerUserController'
import { profile } from './profileUserController'
import { refresh } from './refreshUserController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
