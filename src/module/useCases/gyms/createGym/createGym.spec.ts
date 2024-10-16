import { GymsInMemoryRepository } from '@/module/repositories/contracts/GymsInMemoryRepository/GymsInMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './createGym'

let gymsRepository: GymsInMemoryRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsInMemoryRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym.', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -13.0097769,
      longitude: -38.5317186,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
