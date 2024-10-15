import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../CheckInsRepository'
import { randomUUID } from 'node:crypto'

export class CheckInsMemoryRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }

    this.checkIns.push(checkIn)
    return checkIn
  }
}
