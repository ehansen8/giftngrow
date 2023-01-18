import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
}

const ddbClient = new DynamoDBClient(config)
export { ddbClient }
