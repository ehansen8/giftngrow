import axios from 'axios'
import { Entry } from '../lib/entities/entry.entity'

export default async function fetchEntries() {
  const { data } = await axios.get<Entry[]>(`/api/items/entries`)
  return data
}
