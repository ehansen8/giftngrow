import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../../lib/entityManager'
import { Item } from '../../../../lib/entities/item.entity'
import { logger } from '../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const item = new Item(req.query.id as string)

    const parentItem = await entityManager.find(item, { limit: 1 })
    if (!parentItem || parentItem.length == 0) {
      res.json({
        ok: true,
        error: '',
        data: '',
      })
      return
    }
    res.json({
      ok: true,
      error: '',
      data: parentItem,
    })
  } catch (e) {
    res.json({
      ok: false,
      error: (e as any).message,
      data: '',
    })
    logger.error({ err: e, req: req }, 'Fetch Item Error')
  }
}
