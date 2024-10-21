import { PrismaCheckInsRepository } from '@/module/repositories/contracts/PrismaUsersRepository/PrismaCheckInsRepository'
import { FetchUserCheckInsUseCaseHistory } from '../../users/fetchUserCheckInsHistory'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsUseCaseHistory(checkInsRepository)

  return useCase
}
