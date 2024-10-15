import { UsersInMemoryRepository } from '@/module/repositories/contracts/UsersInMemoryRepository/UsersInMemoryRepository'
import { ResourceNotFoundError } from '@/module/errors/ResourceNotFoundError/ResourceNotFoundError'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetUserProfileUseCaseUseCase } from './index'
import { hash } from 'bcryptjs'

let usersRepository: UsersInMemoryRepository
let sut: GetUserProfileUseCaseUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    sut = new GetUserProfileUseCaseUseCase(usersRepository)
  })

  it('should be able to get user profile.', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('bolinha12345', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
