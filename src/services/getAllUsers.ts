import axios from 'axios'
import { User } from '../lib/entities/user.entity'

export default async function fetchEntries() {
  const { data } = await axios.get<User[]>(`/api/user/list`)
  return data
}
