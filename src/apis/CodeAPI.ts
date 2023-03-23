import { AddCodeForm } from '../../types/general'
import { axiosInstance } from '../lib/axiosInstance'
export class CodeAPI {
  static async addEntry(entry: AddCodeForm) {
    return await axiosInstance<AddCodeForm>({
      method: 'POST',
      url: `/api/item/add`,
      data: entry,
    })
  }
}
