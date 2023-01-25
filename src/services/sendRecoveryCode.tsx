import axios from 'axios'

export async function sendRecoveryCode(params: { email: string }) {
  const { data } = await axios.get(`/api/cognito/signup/sendRecoveryCode`, {
    params: { ...params },
  })
  return data
}
