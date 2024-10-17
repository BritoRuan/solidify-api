import { GymsInMemoryRepository } from '@/module/repositories/contracts/GymsInMemoryRepository/GymsInMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './index'

let gynsRepository: GymsInMemoryRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gynsRepository = new GymsInMemoryRepository()
    sut = new SearchGymUseCase(gynsRepository)
  })

  it('should be able to search gyms', async () => {
    await gynsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -13.0097769,
      longitude: -38.5317186,
    })

    await gynsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -13.0097769,
      longitude: -38.5317186,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search.', async () => {
    for (let i = 1; i <= 22; i++) {
      await gynsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -13.0097769,
        longitude: -38.5317186,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
