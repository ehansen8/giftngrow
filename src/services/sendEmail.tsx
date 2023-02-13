import axios from 'axios'

export async function sendEmail() {
  const { data } = await axios.get(`/api/contact`)
  return data
}
