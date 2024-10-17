import { randomUUID } from 'crypto'
import { FindManyNearbyParams, IGymsRepository } from '../GymsRepository'
import { Gym, Prisma } from '@prisma/client'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordiantes'

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

  async searchMany(query: string, page: number) {
    return this.gyns
      .filter((gyns) => gyns.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async fetchManyNearby(params: FindManyNearbyParams) {
    return this.gyns.filter((gyms) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gyms.latitude.toNumber(),
          longitude: gyms.longitude.toNumber(),
        },
      )
      return distance < 10
    })
  }
}
