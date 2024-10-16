import { CheckInsMemoryRepository } from '@/module/repositories/contracts/CheckInsMemoryRepository/CheckInsMemoryRepository'
import { describe, expect, it, beforeEach } from 'vitest'
import { FetchUserCheckInsUseCaseHistory } from './index'

let checksInsRepository: CheckInsMemoryRepository
let sut: FetchUserCheckInsUseCaseHistory

describe('Fetch Check-in History Use Case', () => {
  beforeEach(async () => {
    checksInsRepository = new CheckInsMemoryRepository()
    sut = new FetchUserCheckInsUseCaseHistory(checksInsRepository)
  })

  it('should be able to check in history.', async () => {
    await checksInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await checksInsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated user check-in history.', async () => {
    for (let i = 1; i <= 22; i++) {
      await checksInsRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})
