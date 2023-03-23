import axios from 'axios'
import { ITrackingCode } from '../lib/entities/trackingCode.entity'

export interface UserAPI {
  email?: string | null
}
export class UserAPI {
  constructor(email?: string | null) {
    this.email = email
  }

  async addTrackingCode(code: string) {
    const email = this.email
    if (email) {
      const { data } = await axios.post(`/api/users/${email}/codes/`, {
        code: code,
      })
      return data
    }
    //If no user -> send to local storage
    const codes: ITrackingCode[] = JSON.parse(
      localStorage.getItem('codes') || '[]',
    )
    codes.push({ code: code })
    localStorage.setItem('codes', JSON.stringify(codes))
  }

  async deleteTrackingCode(deleteCode: string) {
    const email = this.email
    if (email) {
      const { data } = await axios.delete(
        `/api/users/${email}/codes/${deleteCode}`,
      )

      return data
    }
    //If no user -> send to local storage
    let codes: ITrackingCode[] = JSON.parse(
      localStorage.getItem('codes') || '[]',
    )

    codes = codes.filter(({ code }) => code !== deleteCode)
    localStorage.setItem('codes', JSON.stringify(codes))
  }

  async getTrackingCodes(): Promise<ITrackingCode[]> {
    const email = this.email
    if (email) {
      const { data } = await axios.get<ITrackingCode[]>(
        `/api/users/${email}/codes`,
      )
      return data
    }

    return JSON.parse(localStorage.getItem('codes') || '[]')
  }
}
