import { NextApiRequest, NextApiResponse } from 'next'
import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from '../../../../lib/db'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //TODO: convert to entity Manager query
  let id = req.query.id
  if (id == 'undefined') {
    res.json([])
    return
  }
  const params: QueryCommandInput = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'PK = :PK and begins_with(SK, :SK)',
    ExpressionAttributeValues: {
      ':PK': `ITEM#${id}`,
      ':SK': 'ENTRY#',
    },
  }
  const { Items } = await ddbDocClient.send(new QueryCommand(params))
  res.json(Items)
}
