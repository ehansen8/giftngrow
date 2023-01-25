import axios from 'axios'
import { SignUpParams } from '../../types/general'

export async function createUser(params: SignUpParams) {
  const { data } = await axios.get(`/api/auth/cognito/signup`, {
    params: { ...params },
  })
  return data
}
