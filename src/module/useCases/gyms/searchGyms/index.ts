import { IGymsRepository } from '@/module/repositories/contracts/GymsRepository'
import { Gym } from '@prisma/client'

interface ISearchGymUseCaseRequest {
  query: string
  page: number
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymUseCaseRequest): Promise<ISearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}
