import { CheckInsMemoryRepository } from '@/module/repositories/contracts/CheckInsMemoryRepository/CheckInsMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './index'

let checksInsRepository: CheckInsMemoryRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checksInsRepository = new CheckInsMemoryRepository()
    sut = new GetUserMetricsUseCase(checksInsRepository)
  })

  it('should be able to get check-ins count from metrics.', async () => {
    await checksInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checksInsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
