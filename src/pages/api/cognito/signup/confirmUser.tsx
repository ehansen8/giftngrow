import { NextApiRequest, NextApiResponse } from 'next'
import { serverConfirmSignUp } from '../../../../lib/cognitoManager'
import { logger } from '../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  type ConfirmParams = {
    email: string
    code: string
  }
  const params = req.query as ConfirmParams

  try {
    const data = await serverConfirmSignUp({ ...params })
    res.json({
      ok: true,
      error: '',
      data: data,
    })
  } catch (err) {
    logger.warn(err, 'Confirm Sign UP error')
    res.json({
      ok: false,
      //@ts-ignore
      error: err.message,
      data: '',
    })
  }
}
