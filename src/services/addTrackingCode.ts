import axios from 'axios'

export default async function addTrackingCode(email: string, code: string) {
  const { data } = await axios.post(`/api/users/${email}/codes/`, {
    code: code,
  })
  return data
}
