import { NextApiRequest, NextApiResponse } from 'next'
import { TrackingCode } from '../../../../lib/entities/trackingCode.entity'
import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../../lib/db'

export default async function codes(req: NextApiRequest, res: NextApiResponse) {
  const params: QueryCommandInput = {
    TableName: 'giftngrow.dev',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :GSI1PK',
    ExpressionAttributeValues: {
      ':GSI1PK': `USER#${req.query.user}`,
    },
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(params))

  /**const { items } = await entityManager.find(
    TrackingCode,
    {
      user: req.query.user,
    },
    { queryIndex: 'GSI1' },
  ) */
  res.json(Items)
}
