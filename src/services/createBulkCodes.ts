import axios from 'axios'

/**
 * This Creates new Codes and returns the created codes in PDF form
 * @param pages number of code pages to create
 * @returns a pdf as blob data
 */
export async function createBulkCodes(pages: number) {
  const { data } = await axios.get<Blob>(`/api/items/generate`, {
    params: { pages: pages },
    responseType: 'blob',
  })

  return data
}
