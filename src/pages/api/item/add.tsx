import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Retryer } from 'react-query/types/core/retryer'
import { AddCodeForm, ApiRes } from '../../../../types/general'
import { emailManager } from '../../../lib/emailManager'
import { Entry } from '../../../lib/entities/entry.entity'
import { TrackingCode } from '../../../lib/entities/trackingCode.entity'
import { entityManager } from '../../../lib/entityManager'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return
  }

  const data = req.body as AddCodeForm
  const entry = new Entry()
  entry.fromObject(data)
  // Check that the Code exists in DB by checking the entry parent
  const parentItem = await entityManager.findOne(entry.getItem())
  // Failed to find match
  if (!parentItem) {
    res.json({
      ok: false,
      error: 'Invalid Code',
      data: '',
    })
    return
  }

  // Try create
  let response: PutCommandOutput
  try {
    response = await entityManager.create(entry)
  } catch (e: any) {
    //DynamoDBServiceException
    res.json({
      ok: false,
      error: e.message,
      data: '',
    })
    return
  }

  //Successful Create

  //TODO: Trigger emails to subscribers
  const code = new TrackingCode(data.code)
  const tmp_subscribers = await entityManager.find(code)
  const subscribers = [{ user: 'no-reply@giftngrow.com' }] as TrackingCode[]
  const emailData = await emailManager.sendTrackingUpdates(
    subscribers.map((user) => user.user),
    data.code,
  )

  console.log(emailData)

  res.json({
    ok: true,
    error: '',
    data: { createResponse: response, emailResponse: emailData },
  })
}
