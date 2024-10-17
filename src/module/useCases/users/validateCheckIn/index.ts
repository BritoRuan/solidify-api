import { ResourceNotFoundError } from '@/module/errors/ResourceNotFoundError/ResourceNotFoundError'
import { ICheckInsRepository } from '@/module/repositories/contracts/CheckInsRepository'
import { CheckIn } from '@prisma/client'

interface IValidateCheckInUseCaseRequest {
  checkInId: string
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRespository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRespository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validatedAt = new Date()

    await this.checkInsRespository.save(checkIn)

    return {
      checkIn,
    }
  }
}
