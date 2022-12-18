import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../lib/entities/user.entity'
import { getBatchManager, getEntityManager, KeyCondition } from '@typedorm/core'
import { Entry } from '../../../lib/entities/entry.entity'
import { batchManager, entityManager } from '../../../lib/db'
import getEntriesFromCSV from '../../../utils/getEntriesFromCSV'
import { WriteBatch, BatchManager } from '@typedorm/core'

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  const manager = entityManager

  // Needs ENTRY# because TrackingCode PK also starts with BAG#{{ID}}
  const { items } = await entityManager.find(
    Entry,
    { bagId: req.query.id },
    { keyCondition: { BEGINS_WITH: 'ENTRY#' } },
  )
  res.json(items)
}
