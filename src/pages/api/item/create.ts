import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../lib/entityManager'
import { logger } from '../../../lib/logger'
import { Item } from '../../../lib/entities/item.entity'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return
  }

  try {
    const item = new Item(req.body.code as string)
    const res = await entityManager.create(item)
  } catch (e: any) {
    if (e instanceof DynamoDBServiceException) {
      logger.warn(e, 'DDB Service Exception error')
      return res.json({
        ok: false,
        error: e.message,
        data: '',
      })
    }
    logger.fatal(e, 'Uncaught PutCommandOutput Error')
    return res.json({
      ok: false,
      error: 'Error with code',
      data: '',
    })
  }
  return res.json({
    ok: true,
    error: '',
    data: '',
  })
}
