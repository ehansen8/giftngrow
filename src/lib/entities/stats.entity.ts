import { Set } from 'immutable'
import 'reflect-metadata'
import Attribute, { AutoEpoch } from '../../utils/attribute.decorator'
import { entityManager } from '../entityManager'
import { Model } from './abcModel'

export class Stats extends Model {
  constructor() {
    super()
    this.metadata = {
      name: 'stats',
      PK: 'STATS#',
      SK: 'STATS#',
      partialSK: 'STATS#',
    }
  }
  @Attribute
  cities: Set<string>

  @Attribute
  states: Set<string>

  @Attribute
  times_gifted: number

  static async getStats(): Promise<StatsType> {
    const stats = await entityManager.findOne(new Stats())

    return {
      times_gifted: stats?.times_gifted!,
      cities: stats?.cities.size! - 1,
      states: stats?.states.size! - 1,
    }
  }
}

export type StatsType = {
  times_gifted: number
  cities: number
  states: number
}
