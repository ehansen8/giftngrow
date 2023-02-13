import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from './db'
import { Model } from './entities/abcModel'

const baseParams = { TableName: 'giftngrow.dev' }

class EntityManager {
  async findOne<T extends Model>(entity: T) {
    const params: GetCommandInput = {
      ...baseParams,
      Key: {
        PK: entity.getPK(),
        SK: entity.getSK(),
      },
    }

    const data = await ddbDocClient.send(new GetCommand(params))
    return data.Item as T
  }

  async find<T extends Model>(entity: T, useIndex = false) {
    const params: QueryCommandInput = {
      ...baseParams,
      KeyConditionExpression: 'PK = :PK AND begins_with( SK, :SK)',
      ExpressionAttributeValues: {
        ':PK': entity.getPK(),
        ':SK': entity.metadata.partialSortKey,
      },
    }

    const data = await ddbDocClient.send(new QueryCommand(params))
    return data.Items as T[]
  }

  async create<T extends Model>(entity: T) {
    const params: PutCommandInput = {
      ...baseParams,

      Item: entity.getDBObject(),
    }

    return ddbDocClient.send(new PutCommand(params))
  }
}

const entityManager = new EntityManager()
export { entityManager }
