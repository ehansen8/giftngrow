import axios from 'axios'

export async function sendCofirmationCode(params: { email: string }) {
  const { data } = await axios.get(
    `/api/auth/cognito/signup/sendConfirmationCode`,
    {
      params: { ...params },
    },
  )
  return data
}
