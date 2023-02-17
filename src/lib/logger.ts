import { pino } from 'pino'
import '@serdnam/pino-cloudwatch-transport'

const transport = pino.transport({
  target: '@serdnam/pino-cloudwatch-transport',
  options: {
    logGroupName: 'pino-cloudwatch-test',
    logStreamName: 'pino-cloudwatch-test-stream',
    awsRegion: 'us-east-2',
    awsAccessKeyId: process.env.DB_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    interval: 1_000, // this is the default
  },
})
const logger = pino(transport)
export { logger }
