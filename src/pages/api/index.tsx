import { NextApiRequest, NextApiResponse } from 'next'
import { Stats } from '../../lib/entities/stats.entity'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const data = await Stats.getStats()
  res.json(data)
}
