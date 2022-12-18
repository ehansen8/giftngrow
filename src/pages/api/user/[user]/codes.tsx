import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../../lib/db'
import { TrackingCode } from '../../../../lib/entities/trackingCode.entity'

export default async function codes(req: NextApiRequest, res: NextApiResponse) {
  const { items } = await entityManager.find(
    TrackingCode,
    {
      user: req.query.user,
    },
    { queryIndex: 'GSI1' },
  )
  res.json(items)
}
