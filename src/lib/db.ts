import 'reflect-metadata';
import {BatchManager, createConnection, EntityManager, getBatchManager, getEntityManager} from /* webpackIgnore: true */'@typedorm/core';
import { User } from './entities/user.entity';
import { INDEX_TYPE, Table } from '@typedorm/common';
import {DynamoDB} from 'aws-sdk';
import { Entry } from './entities/entry.entity';
import { Bag } from './entities/bag.entity';
import { TrackingCode } from './entities/trackingCode.entity';

const config: DynamoDB.ClientConfiguration = {
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
}

 
const gngTable = new Table({
    name: 'giftngrow.dev',
    partitionKey: 'PK',
    sortKey: 'SK',
    indexes: {
        GSI1: {
            type: INDEX_TYPE.GSI,
            partitionKey: 'GSI1PK',
            sortKey: 'GSI1SK',
        }
    }
});


try {
  createConnection({
  table: gngTable,
  entities: [User,Bag,Entry,TrackingCode], // list other entities as you go
  documentClient: new DynamoDB.DocumentClient(config)
  })
} catch (err) {
  
}




/* function getManager() {
    let manager: EntityManager
    try {
      manager = getEntityManager()
    } catch (err) {
      manager = getConnection().entityManager
    }
    return manager
}
function getBatchManager() {
  let manager: BatchManager
  try {
    manager = getBatchManager()
  } catch (err) {
    manager = getConnection().batchManager
  }
  return manager
} */

export const batchManager = getBatchManager()
export const entityManager = getEntityManager()