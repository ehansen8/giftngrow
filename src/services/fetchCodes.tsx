import axios from 'axios'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { User } from '../lib/entities/user.entity'

export default async function fetchEntries(user: User) {
  const { data } = await axios.get<TrackingCode[]>(
    `/api/user/${user.email}/codes`,
  )
  return data
}
