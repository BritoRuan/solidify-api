import { IUsersRepository } from '@/module/repositories/contracts/UsersRepository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class UsersInMemoryRepository implements IUsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    }

    this.users.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    return user || null
  }
}
