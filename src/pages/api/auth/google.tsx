import { NextApiRequest, NextApiResponse } from 'next'
import { parseJWT } from '../../../utils/parseJWT'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.body.credential
  console.log(req.body)
  const data = parseJWT(token)
  res.json(data)
}
