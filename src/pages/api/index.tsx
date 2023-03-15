import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb'
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import logger from 'next-auth/utils/logger'
import { AddCodeForm } from '../../../types/general'
import { emailManager } from '../../lib/emailManager'
import { Entry } from '../../lib/entities/entry.entity'
import { entityManager } from '../../lib/entityManager'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query as AddCodeForm
  const entry = Entry.fromObject(data)
  //Try create
  let response: PutCommandOutput
  try {
    response = await entityManager.create(entry)
  } catch (e: any) {
    if (e instanceof DynamoDBServiceException) {
      res.json({
        ok: false,
        error: e.message,
        data: '',
      })
    }
    return
  }

  //Update Global Stats
  try {
    entityManager.updateStats(entry)
  } catch (e: any) {}
  res.json(response)
}
