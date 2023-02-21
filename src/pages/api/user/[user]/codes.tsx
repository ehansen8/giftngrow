import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../../lib/entityManager'
import { TrackingCode } from '../../../../lib/entities/trackingCode.entity'

export default async function codes(req: NextApiRequest, res: NextApiResponse) {
  const codes = await entityManager.find(
    TrackingCode.forUser(req.query.user as string),
    { useIndex: true },
  )
  res.json(codes)
}
