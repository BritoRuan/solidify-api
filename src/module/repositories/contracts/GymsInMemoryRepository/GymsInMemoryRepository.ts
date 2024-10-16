import { randomUUID } from 'crypto'
import { IGymsRepository } from '../GymsRepository'
import { Gym, Prisma } from '@prisma/client'

export class GymsInMemoryRepository implements IGymsRepository {
  public gyns: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      createdAt: new Date(),
    }

    this.gyns.push(gym)

    return gym
  }

  async findById(id: string) {
    const gyms = this.gyns.find((gyms) => gyms.id === id)

    return gyms || null
  }
}
