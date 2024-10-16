import { CheckInsMemoryRepository } from '@/module/repositories/contracts/CheckInsMemoryRepository/CheckInsMemoryRepository'
import { GymsInMemoryRepository } from '@/module/repositories/contracts/GymsInMemoryRepository/GymsInMemoryRepository'
import { MaxNumberOfCheckInsError } from '@/module/errors/MaxNumberOfCheckInsError/MaxNumberOfCheckInsError'
import { MaxDistanceError } from '@/module/errors/MaxDistanceError/MaxDistanceError'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { CheckInUseCase } from './index'

let checksInsRepository: CheckInsMemoryRepository
let gymsRepository: GymsInMemoryRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checksInsRepository = new CheckInsMemoryRepository()
    gymsRepository = new GymsInMemoryRepository()
    sut = new CheckInUseCase(checksInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -13.0097769,
      longitude: -38.5317186,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in.', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -13.0097769,
      userLongitude: -38.5317186,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 9, 15, 14, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -13.0097769,
      userLongitude: -38.5317186,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -13.0097769,
        userLongitude: -38.5317186,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 9, 15, 14, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -13.0097769,
      userLongitude: -38.5317186,
    })

    vi.setSystemTime(new Date(2024, 9, 26, 9, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -13.0097769,
      userLongitude: -38.5317186,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym.', async () => {
    gymsRepository.gyns.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(51.1143843),
      longitude: new Decimal(3.9261365),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -13.0097769,
        userLongitude: -38.5317186,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
