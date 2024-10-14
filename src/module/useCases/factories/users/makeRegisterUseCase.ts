import { PrismaUsersRepository } from '@/module/repositories/contracts/PrismaUsersRepository'
import { RegisterUseCase } from '@/module/useCases/users/'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
