import { NextApiRequest, NextApiResponse } from 'next'
import { TrackingCode } from '../../../../../lib/entities/trackingCode.entity'
import { entityManager } from '../../../../../lib/entityManager'

export default async function codes(req: NextApiRequest, res: NextApiResponse) {
  const email = req.query.user as string
  if (email == 'undefined') {
    res.status(400).send('Email is undefined')
    return
  }
  if (req.method == 'GET') {
    // List User Tracking Codes
    const codes = await entityManager.find(TrackingCode.forUser(email), {
      useIndex: true,
    })
    res.json(codes)
  } else if (req.method == 'POST') {
    // Add Tracking Code for user
    const code = req.body.code as string
    if (!code) {
      res.status(400).send('Code is required')
      return
    }
    const trackingCode = new TrackingCode(code, email)
    entityManager.create(trackingCode)
    res.status(200).send('Code Added')
  }
}
