import axios from 'axios'
import { Entry } from '../lib/entities/entry.entity'

export default async function fetchEntries(id: string) {
  const { data } = await axios.get<Entry[]>(`/api/item/${id}`)
  return data
}
