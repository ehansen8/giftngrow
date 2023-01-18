import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { ddbClient } from "./ddbClient"

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
}

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
}

// Create the DynamoDB document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
  marshallOptions,
  unmarshallOptions,
})

export { ddbDocClient }
/*
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
*/





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