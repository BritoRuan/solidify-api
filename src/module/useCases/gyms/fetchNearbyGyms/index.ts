import { IGymsRepository } from '@/module/repositories/contracts/GymsRepository'
import { Gym } from '@prisma/client'

interface IFetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymUseCaseRequest): Promise<IFetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return {
      gyms,
    }
  }
}
