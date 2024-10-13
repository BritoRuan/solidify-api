import { UserAlreadyExistsError } from '@/module/errors/UserAlreadyExistsError/UserAlreadyExistsError'
import { IUsersRepository } from '@/module/repositories/contracts/UsersRepository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface IRegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface IRegisterUserResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUserResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })
    return {
      user,
    }
  }
}
