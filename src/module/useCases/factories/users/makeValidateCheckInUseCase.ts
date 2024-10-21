import { PrismaCheckInsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaCheckInsRepository'
import { ValidateCheckInUseCase } from '../../users/validateCheckIn'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
