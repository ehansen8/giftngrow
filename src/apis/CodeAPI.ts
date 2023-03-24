import { AddCodeForm } from '../../types/general'
import { axiosInstance } from '../lib/axiosInstance'
import { IEntry } from '../lib/entities/entry.entity'
export class CodeAPI {
  static async addEntry(entry: AddCodeForm) {
    return axiosInstance<AddCodeForm>({
      method: 'POST',
      url: `/api/item/add`,
      data: entry,
    })
  }

  static async getEntries(code: string) {
    let path: string | undefined = code
    if (code === '') {
      path = undefined
    }
    return axiosInstance<IEntry[]>({
      method: 'GET',
      url: `/api/item/${path}/entries`,
    })
  }
}
