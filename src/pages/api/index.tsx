import { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '../../lib/logger'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  logger.info({}, 'test log')
  res.json(process.env.DB_ACCESS_KEY_ID)
}
