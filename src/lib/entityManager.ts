import {
  BatchWriteCommand,
  BatchWriteCommandInput,
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
type FindOptions = {
  useIndex?: boolean
  limit?: number
  ascendingOrder?: boolean
  /**
   *  Response contains the
   */
  consistantRead?: boolean
}

class EntityManager {
  async findOne<T extends Model>(entity: T, options: FindOptions) {
    const params: GetCommandInput = {
      ...baseParams,
      Key: {
        PK: entity.getPK(),
        SK: entity.getSK(),
      },
      ConsistentRead: options.consistantRead,
    }

    const data = await ddbDocClient.send(new GetCommand(params))
    return data.Item as T | undefined
  }

  async find<T extends Model>(entity: T, options: FindOptions) {
    const expressionNames = {
      '#PK': options.useIndex ? 'GSI1PK' : 'PK',
      '#SK': options.useIndex ? 'GSI1SK' : 'SK',
    }
    const expressionValues = {
      ':PK': options.useIndex ? entity.getIndexPK() : entity.getPK(),
      ':SK': options.useIndex
        ? entity.metadata.index?.partialSK
        : entity.metadata.partialSortKey,
    }
    console.log(expressionValues)
    const params: QueryCommandInput = {
      ...baseParams,
      KeyConditionExpression: '#PK = :PK AND begins_with( #SK, :SK)',
      ExpressionAttributeNames: expressionNames,
      ExpressionAttributeValues: expressionValues,
      Limit: options.limit,
      IndexName: options.useIndex ? 'GSI1' : undefined,
      ScanIndexForward: options.ascendingOrder ? true : false,
      ConsistentRead: options.consistantRead,
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
  /**Limit 25 items per batch! */
  async createBatch<T extends Model>(entities: T[]) {
    const params: BatchWriteCommandInput = {
      RequestItems: {
        [baseParams.TableName]: entities.map((entity) => {
          return { PutRequest: { Item: entity.getDBObject() } }
        }),
      },
    }

    return ddbDocClient.send(new BatchWriteCommand(params), {})
  }
}

const entityManager = new EntityManager()
export { entityManager }
