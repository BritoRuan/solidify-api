import { UsersInMemoryRepository } from '@/module/test/module/user/repositories/UsersInMemoryRepository'
import { UserAlreadyExistsError } from '@/module/errors/UserAlreadyExistsError/UserAlreadyExistsError'
import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from '.'

describe('Register Use Case', () => {
  it('should be able to register.', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'bolinha12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration.', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'bolinha12345',
    })

    const isPasswordCorrectHashed = await compare(
      'bolinha12345',
      user.passwordHash,
    )

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'bolinha12345',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'bolinha12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
