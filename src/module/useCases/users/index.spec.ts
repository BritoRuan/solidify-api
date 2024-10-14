import { UsersInMemoryRepository } from '@/module/test/module/user/repositories/UsersInMemoryRepository'
import { UserAlreadyExistsError } from '@/module/errors/UserAlreadyExistsError/UserAlreadyExistsError'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '.'
import { compare } from 'bcryptjs'

let usersRepository: UsersInMemoryRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register.', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'bolinha12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration.', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'bolinha12345',
    })

    const isPasswordCorrectlyHashed = await compare(
      'bolinha12345',
      user.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'bolinha12345',
    })

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'bolinha12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
