import 'reflect-metadata'
import { NextApiRequest, NextApiResponse } from 'next'
import { batchManager } from '../../lib/db'
import getEntriesFromCSV from '../../utils/getEntriesFromCSV'
import { WriteBatch } from '@typedorm/core'
import { TrackingCode } from '../../lib/entities/trackingCode.entity'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.body.credential
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

  res.json('')
}
