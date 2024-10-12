import { IUsersRepository } from '@/repositories/contracts/UsersRepository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError/UserAlreadyExistsError'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })
  }
}
