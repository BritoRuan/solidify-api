import { PrismaCheckInsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaCheckInsRepository'
import { PrismaGymsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaGymsRepository'
import { CheckInUseCase } from '../../users/checkInUseCase'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
