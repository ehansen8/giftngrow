import { NextApiRequest, NextApiResponse } from 'next'
import { TrackingCode } from '../../../../../lib/entities/trackingCode.entity'
import { logger } from '../../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == 'DELETE') {
    const { user: email, code } = req.query as { user: string; code: string }
    try {
      const data = await TrackingCode.delete(code, email)
      res.json({
        ok: true,
        error: '',
        data: data,
      })
    } catch (error) {
      logger.error(
        { err: error, email: email, code: code },
        'Error deleting tracking code',
      )
      res.json({
        ok: false,
        error: 'Error deleting tracking code',
        data: '',
      })
    }
  }
}
