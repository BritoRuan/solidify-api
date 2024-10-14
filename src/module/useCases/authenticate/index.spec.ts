import { UsersInMemoryRepository } from '@/module/test/module/user/repositories/UsersInMemoryRepository'
import { InvalidCredentialsError } from '@/module/errors/InvalidCredentialsError/InvalidCredentialsError'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '.'
import { hash } from 'bcryptjs'

let usersRepository: UsersInMemoryRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate.', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('bolinha12345', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'bolinha12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'bolinha12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('bolinha12345', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'bolinha1235',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
