import { NextApiRequest, NextApiResponse } from 'next'
import { SignUpParams } from '../../../../../types/general'
import { serverSignUp } from '../../../../lib/cognitoManager'
import { logger } from '../../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params = req.query as SignUpParams
  try {
    const data = await serverSignUp({ ...params })
    res.json({
      ok: true,
      error: '',
      data: data,
    })
  } catch (err) {
    logger.warn(err, 'User Sign Up Error')
    res.json({
      ok: false,
      //@ts-ignore
      error: err.message,
      data: '',
    })
  }
}
