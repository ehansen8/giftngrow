import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
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
  find() {}

  async create<T extends Model>(entity: T) {
    const params: PutCommandInput = {
      ...baseParams,

      Item: entity.getDBObject(),
    }

    try {
      const data = await ddbDocClient.send(new PutCommand(params))
    } catch (err) {
      console.log(err)
    }
    return entity
  }
}

const entityManager = new EntityManager()
export { entityManager }
