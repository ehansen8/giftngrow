import axios from 'axios'

export async function createBulkCodes(pages: number) {
  const { data } = await axios.get(`/api/getCodes`, {
    params: { pages: pages },
  })
  return data
}
