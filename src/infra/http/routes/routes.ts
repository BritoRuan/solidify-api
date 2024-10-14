import { register } from '@/module/controllers/registerUserController'
import { authenticate } from '@/module/controllers/sessionUserController'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
