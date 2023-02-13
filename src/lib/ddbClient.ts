import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { SESClientConfig } from '@aws-sdk/client-ses/dist-types/SESClient'

const config: DynamoDBClientConfig | SESClientConfig = {
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
}

const emailClient = new SESClient(config as SESClientConfig)

const ddbClient = new DynamoDBClient(config)
export { ddbClient, emailClient }
