import { PrismaGymsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaGymsRepository'
import { FetchNearbyGymUseCase } from '../../gyms/fetchNearbyGyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymUseCase(gymsRepository)

  return useCase
}
