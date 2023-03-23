import axios from 'axios'

export default async function deleteTrackingCode(email: string, code: string) {
  const { data } = await axios.delete(`/api/users/${email}/codes/${code}`)
  return data
}
