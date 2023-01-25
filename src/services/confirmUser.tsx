import axios from 'axios'

export async function confirmUser(params: { email: string; code: string }) {
  const { data } = await axios.get(`/api/auth/cognito/signup/confirm`, {
    params: { ...params },
  })
  return data
}
