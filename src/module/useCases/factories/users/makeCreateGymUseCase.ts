import { PrismaGymsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaGymsRepository'
import { CreateGymUseCase } from '../../gyms/createGym/createGym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
