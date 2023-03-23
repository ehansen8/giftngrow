import {
  BatchWriteCommand,
  BatchWriteCommandInput,
  DeleteCommandInput,
  DeleteCommand,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from './db'
import { Model } from './entities/abcModel'
import { Entry } from './entities/entry.entity'
import { User } from './entities/user.entity'

const baseParams = { TableName: process.env.TABLE_NAME }
type FindOptions = {
  useIndex?: boolean
  limit?: number
  ascendingOrder?: boolean
  /**
   *  Response will be up to date with all previous DB writes
   */
  consistantRead?: boolean
}

class EntityManager {
  async findOne<T extends Model>(entity: T, options: FindOptions = {}) {
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

  async find<T extends Model>(entity: T, options: FindOptions = {}) {
    const expressionNames = {
      '#PK': options.useIndex ? 'GSI1PK' : 'PK',
      '#SK': options.useIndex ? 'GSI1SK' : 'SK',
    }
    const expressionValues = {
      ':PK': options.useIndex ? entity.getIndexPK() : entity.getPK(),
      ':SK': options.useIndex
        ? entity.metadata.index?.partialSK
        : entity.metadata.partialSK,
    }
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
  async allEntries(limit?: number) {
    const expressionValues = {
      ':PK': 'ENTRY#',
      ':SK': 'ENTRY#',
    }
    const params: QueryCommandInput = {
      ...baseParams,
      KeyConditionExpression: 'GSI1PK = :PK AND begins_with( GSI1SK, :SK)',
      ExpressionAttributeValues: expressionValues,
      IndexName: 'GSI1',
      Limit: limit,
    }

    const data = await ddbDocClient.send(new QueryCommand(params))
    return data.Items as Entry[]
  }

  async allUsers(limit?: number) {
    const expressionValues = {
      ':PK': 'USER#',
      ':SK': 'USER#',
    }
    const params: QueryCommandInput = {
      ...baseParams,
      KeyConditionExpression: 'GSI1PK = :PK AND begins_with( GSI1SK, :SK)',
      ExpressionAttributeValues: expressionValues,
      IndexName: 'GSI1',
      Limit: limit,
    }

    const data = await ddbDocClient.send(new QueryCommand(params))
    return data.Items as User[]
  }

  async updateStats(entry: Entry) {
    const cities = [entry.recipCity, entry.giverCity].map((e) => e ?? '')
    const states = [entry.recipState, entry.giverState].map((e) => e ?? '')

    const params: UpdateCommandInput = {
      ...baseParams,
      Key: {
        PK: 'STATS#',
        SK: 'STATS#',
      },
      UpdateExpression: 'ADD cities :cities, states :states, times_gifted :inc',
      ExpressionAttributeValues: {
        ':cities': new Set(cities),
        ':states': new Set(states),
        ':inc': 1,
      },
    }

    return ddbDocClient.send(new UpdateCommand(params))
  }

  async delete<T extends Model>(entity: T) {
    const params: DeleteCommandInput = {
      ...baseParams,
      Key: {
        PK: entity.getPK(),
        SK: entity.getSK(),
      },
    }
    return ddbDocClient.send(new DeleteCommand(params))
  }
}

const entityManager = new EntityManager()
export { entityManager }
