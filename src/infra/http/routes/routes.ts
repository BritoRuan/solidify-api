import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/sessionUserController'
import { profile } from '../controllers/profileUserController'
import { register } from '../controllers/registerUserController'
import { verifyJWT } from '../middlewares/verifyJwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
