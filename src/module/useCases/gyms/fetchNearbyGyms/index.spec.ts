import { GymsInMemoryRepository } from '@/module/repositories/contracts/GymsInMemoryRepository/GymsInMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { FetchNearbyGymUseCase } from './index'

let gynsRepository: GymsInMemoryRepository
let sut: FetchNearbyGymUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gynsRepository = new GymsInMemoryRepository()
    sut = new FetchNearbyGymUseCase(gynsRepository)
  })

  it('should be able to search gyms', async () => {
    await gynsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -13.0097769,
      longitude: -38.5317186,
    })

    await gynsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -13.0097769,
      userLongitude: -38.5317186,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
