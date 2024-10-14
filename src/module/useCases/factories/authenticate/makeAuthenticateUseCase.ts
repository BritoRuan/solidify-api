import { PrismaUsersRepository } from '@/module/repositories/contracts/PrismaUsersRepository'
import { AuthenticateUseCase } from '@/module/useCases/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
