import { PrismaUsersRepository } from '@/module/repositories/contracts/prisma/PrismaUsersRepository'
import { AuthenticateUseCase } from '@/module/useCases/users/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
