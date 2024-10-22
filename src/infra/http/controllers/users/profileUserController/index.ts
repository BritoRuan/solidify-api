import { makeGetUserProfileUseCase } from '@/module/useCases/factories/users/makeGetUserProfileUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}