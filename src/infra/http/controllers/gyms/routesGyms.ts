import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/infra/http/middlewares/verifyJwt'
import { search } from './searchGymController'
import { nearby } from './nearbyGymController'
import { create } from './createGymController'
import { verifyUserRole } from '../../middlewares/verifyUserRole'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
