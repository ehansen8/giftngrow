import { NextApiRequest, NextApiResponse } from 'next'
import { Entry } from '../../lib/entities/entry.entity'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  res.json('Nothing Here Currently')
}
