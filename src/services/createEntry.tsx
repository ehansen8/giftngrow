import { PutCommandOutput } from '@aws-sdk/lib-dynamodb'
import axios from 'axios'
import { AddCodeForm, ApiRes } from '../../types/general'

type AddCodeOutput = ApiRes<PutCommandOutput>

export async function createEntry(entry: AddCodeForm) {
  const { data } = await axios.post<AddCodeOutput>(`/api/item/add`, entry)
  return data
}
