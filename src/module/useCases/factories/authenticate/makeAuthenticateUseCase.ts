import { PrismaUsersRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaUsersRepository'
import { AuthenticateUseCase } from '@/module/useCases/users/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
