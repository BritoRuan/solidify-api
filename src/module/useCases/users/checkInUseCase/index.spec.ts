import { CheckInsMemoryRepository } from '@/module/repositories/contracts/CheckInsMemoryRepository/CheckInsMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './index'

let usersRepository: CheckInsMemoryRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new CheckInsMemoryRepository()
    sut = new CheckInUseCase(usersRepository)
  })

  it('should be able to check in.', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
