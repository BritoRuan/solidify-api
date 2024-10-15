import { PrismaUsersRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaUsersRepository'
import { RegisterUseCase } from '@/module/useCases/users/registerUseCase'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
