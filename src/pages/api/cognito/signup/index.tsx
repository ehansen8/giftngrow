import { NextApiRequest, NextApiResponse } from 'next'
import { SignUpParams } from '../../../../../types/general'
import { serverSignUp } from '../../../../lib/cognitoManager'

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
    res.json({
      ok: false,
      //@ts-ignore
      error: err.message,
      data: '',
    })
  }
}
