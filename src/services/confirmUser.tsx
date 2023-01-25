import axios from 'axios'

export async function confirmUser(params: { email: string; code: string }) {
  const { data } = await axios.get(`/api/cognito/signup/confirm`, {
    params: { ...params },
  })
  return data
}
