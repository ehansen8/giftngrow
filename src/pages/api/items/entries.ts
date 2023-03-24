import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../lib/entityManager'
import { logger } from '../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const entries = await entityManager.allEntries()
    res.json(entries)
    return
  } catch (err) {
    logger.fatal(err, 'error fetching all entries')
  }
  res.json('')
}
