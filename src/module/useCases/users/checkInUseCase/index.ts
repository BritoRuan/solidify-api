import { MaxDistanceError } from '@/module/errors/MaxDistanceError/MaxDistanceError'
import { MaxNumberOfCheckInsError } from '@/module/errors/MaxNumberOfCheckInsError/MaxNumberOfCheckInsError'
import { ResourceNotFoundError } from '@/module/errors/ResourceNotFoundError/ResourceNotFoundError'
import { ICheckInsRepository } from '@/module/repositories/contracts/CheckInsRepository'
import { IGymsRepository } from '@/module/repositories/contracts/GymsRepository'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordiantes'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRespository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInsRespository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRespository.create({
      gymId,
      userId,
    })

    return {
      checkIn,
    }
  }
}
