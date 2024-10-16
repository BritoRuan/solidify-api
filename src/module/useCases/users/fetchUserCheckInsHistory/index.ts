import { ICheckInsRepository } from '@/module/repositories/contracts/CheckInsRepository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCaseHistory {
  constructor(private checkInsRespository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRespository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
