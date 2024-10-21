import { PrismaCheckInsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaCheckInsRepository'
import { GetUserMetricsUseCase } from '../../users/getUserMetrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
