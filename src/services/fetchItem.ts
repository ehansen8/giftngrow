import axios from 'axios'
import { ApiRes } from '../../types/general'
import { Item } from '../lib/entities/item.entity'

export default async function fetchItem(id: string) {
  const { data } = await axios.get<ApiRes<Item>>(`/api/item/${id}`)
  return data
}
