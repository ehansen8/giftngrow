import { NextApiRequest, NextApiResponse } from 'next'
import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { emailManager } from '../../lib/emailManager'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //res.json(await emailManager.send('no-reply@giftngrow.com'))
}
