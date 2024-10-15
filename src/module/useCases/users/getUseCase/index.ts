import { ResourceNotFoundError } from '@/module/errors/ResourceNotFoundError/ResourceNotFoundError'
import { IUsersRepository } from '@/module/repositories/contracts/UsersRepository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCaseUseCase {
  constructor(private usersRespository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRespository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
