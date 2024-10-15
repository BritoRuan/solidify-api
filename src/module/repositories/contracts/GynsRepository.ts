import { Gyn } from '@prisma/client'

export interface IGynsRepository {
  findById(id: string): Promise<Gyn | null>
}
