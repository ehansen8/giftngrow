import { NextApiRequest, NextApiResponse } from 'next'
import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../lib/db'

export default async function id(req: NextApiRequest, res: NextApiResponse) {
  const params: QueryCommandInput = {
    TableName: 'giftngrow.dev',
    KeyConditionExpression: 'PK = :PK and begins_with(SK, :SK)',
    ExpressionAttributeValues: {
      ':PK': `BAG#${req.query.id}`,
      ':SK': 'ENTRY#',
    },
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(params))

  res.json(Items)
  /**const manager = entityManager

  // Needs ENTRY# because TrackingCode PK also starts with BAG#{{ID}}
  try {
    const { items } = await entityManager.find(
      Entry,
      { bagId: req.query.id },
      { keyCondition: { BEGINS_WITH: 'ENTRY#' } },
    )
    res.json(items)
  } catch (error) {
    res.json(error)
  } */
}
