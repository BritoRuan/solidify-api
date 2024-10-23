import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/infra/http/middlewares/verifyJwt'
import { create } from './createCheckInController'
import { validate } from './validateCheckInController'
import { history } from './historyCheckInController'
import { metrics } from './metricsCheckInController'
import { verifyUserRole } from '../../middlewares/verifyUserRole'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
