import { NextApiRequest, NextApiResponse } from 'next'
import { Stats } from '../../../lib/entities/stats.entity'
import { logger } from '../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const stats = await Stats.getStats()
    res.json(stats)
  } catch (error) {
    logger.fatal(error, 'Failed to fetch global stats')
    res.json('')
  }
}
