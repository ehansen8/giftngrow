import axios from 'axios'
import { User } from '../lib/entities/user.entity'

export default async function getAllUsers() {
  const { data } = await axios.get<User[]>(`/api/users`)
  return data
}
