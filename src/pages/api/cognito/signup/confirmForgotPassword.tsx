import { NextApiRequest, NextApiResponse } from 'next'
import { serverConfirmForgotPassword } from '../../../../lib/cognitoManager'
import { logger } from '../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  type ConfirmParams = {
    email: string
    code: string
    password: string
  }
  const params = req.query as ConfirmParams

  try {
    const data = await serverConfirmForgotPassword({ ...params })
    res.json({
      ok: true,
      error: '',
      data: data,
    })
  } catch (err) {
    logger.warn(err, 'Confirm Forgot Password error')
    res.json({
      ok: false,
      //@ts-ignore
      error: err.message,
      data: '',
    })
  }
}
