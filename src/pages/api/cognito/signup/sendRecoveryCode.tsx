import { NextApiRequest, NextApiResponse } from 'next'
import { serverSendRecoveryCode } from '../../../../lib/cognitoManager'
import { logger } from '../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  type Params = {
    email: string
  }
  const params = req.query as Params
  try {
    const data = await serverSendRecoveryCode({ ...params })
    res.json({
      ok: true,
      error: '',
      data: data,
    })
  } catch (err) {
    logger.warn(err, 'Send Recovery Code error')
    res.json({
      ok: false,
      //@ts-ignore
      error: err.message,
      data: '',
    })
  }
}
