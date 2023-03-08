import axios from 'axios'
import { StatsType } from '../lib/entities/stats.entity'

export default async function getGlobalStats() {
  const { data } = await axios.get<StatsType>(`/api/items/stats`)
  return data
}
