import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../lib/entityManager'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const entries = await entityManager.allEntries()
  res.json(entries)
}
