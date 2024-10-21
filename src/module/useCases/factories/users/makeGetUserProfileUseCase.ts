import { PrismaUsersRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaUsersRepository'
import { GetUserProfileUseCaseUseCase } from '../../users/getUseCase'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCaseUseCase(usersRepository)

  return useCase
}
