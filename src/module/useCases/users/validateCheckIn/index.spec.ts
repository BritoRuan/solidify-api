import { CheckInsMemoryRepository } from '@/module/repositories/contracts/CheckInsMemoryRepository/CheckInsMemoryRepository'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckInUseCase } from './index'
import { ResourceNotFoundError } from '@/module/errors/ResourceNotFoundError/ResourceNotFoundError'

let checksInsRepository: CheckInsMemoryRepository
let sut: ValidateCheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checksInsRepository = new CheckInsMemoryRepository()
    sut = new ValidateCheckInUseCase(checksInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in.', async () => {
    const createdCheckIn = await checksInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checksInsRepository.checkIns[0].validatedAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate an inexistent check-in.', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 9, 21, 11, 6))

    const createdCheckIn = await checksInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21 // 21 MINUTOS

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
