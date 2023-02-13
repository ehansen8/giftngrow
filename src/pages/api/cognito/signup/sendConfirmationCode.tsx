import { NextApiRequest, NextApiResponse } from 'next'
import { serverSendCofirmationCode } from '../../../../lib/cognitoManager'
type Params = {
  email: string
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const params = req.query as Params
  try {
    //TODO: wrap the ok, error, data in some sort of handler
    const data = await serverSendCofirmationCode({ ...params })
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
