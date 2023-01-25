import axios from 'axios'

export async function confirmForgotPassword(params: {
  email: string
  code: string
  password: string
}) {
  const { data } = await axios.get(
    `/api/cognito/signup/confirmForgotPassword`,
    {
      params: { ...params },
    },
  )
  return data
}
