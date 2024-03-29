import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { AddCodeForm } from '../../../../types/general'
import { emailManager } from '../../../lib/emailManager'
import { Entry } from '../../../lib/entities/entry.entity'
import { TrackingCode } from '../../../lib/entities/trackingCode.entity'
import { entityManager } from '../../../lib/entityManager'
import { logger } from '../../../lib/logger'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return
  }
  const session = await getSession({ req })
  const data = req.body as AddCodeForm
  const entry = Entry.fromObject(data)
  // Check that the Code exists in DB by checking the entry parent
  const parentItem = await entityManager.find(entry.getItem(), { limit: 1 })
  // Failed to find match
  if (!parentItem || parentItem.length == 0) {
    res.status(400).send('Invalid Code')
    return
  }

  // Try create
  let response: PutCommandOutput
  try {
    response = await entityManager.create(entry)
  } catch (e: any) {
    if (e instanceof DynamoDBServiceException) {
      logger.warn(e, 'DDB Service Exception error')
      res.status(500).send(e.message)
      return
    }
    logger.fatal(e, 'Uncaught PutCommandOutput Error')
    return
  }

  //Update Global Stats
  try {
    entityManager.updateStats(entry)
  } catch (e: any) {
    // Log but don't return error
    logger.error({ err: e, entry: entry }, 'Global Stat Entry Update Error')
  }

  try {
    const code = new TrackingCode(data.code)
    let subscribers = await entityManager.find(code)

    let sendingUser = ''
    if (session && session.user?.email) {
      sendingUser = session.user.email
    }

    // remove the sending user from sub list so sending user email will never receive an entry update that they created
    subscribers = subscribers.filter(({ user }) => user !== sendingUser)

    //TODO: Consider if this is necessary in test
    //only send emails to gng if not in prod
    // if (process.env.AWS_BRANCH !== 'prod') {
    //   subscribers = [{ user: 'no-reply@giftngrow.com' }] as TrackingCode[]
    // }

    //Extracted adding a tracking code to the client logic, since not signed in Users can still add codes

    const emailData = await emailManager.sendTrackingUpdates(
      subscribers.map((user) => user.user),
      data.code,
    )

    res.json({ createResponse: response, emailResponse: emailData })
  } catch (e) {
    logger.error(e, 'Tracking update email errored in some way')
    res.json({ createResponse: response, emailResponse: '' })
  }
}
