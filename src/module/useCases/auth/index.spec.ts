import { UsersInMemoryRepository } from '@/module/test/module/user/repositories/UsersInMemoryRepository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '.'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/module/errors/InvalidCredentialsError/InvalidCredentialsError'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate.', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new UsersInMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'bolinha12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

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
