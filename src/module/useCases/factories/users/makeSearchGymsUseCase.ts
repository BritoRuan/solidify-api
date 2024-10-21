import { PrismaGymsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaGymsRepository'
import { SearchGymUseCase } from '../../gyms/searchGyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
