import { emailClient } from './ddbClient'
import {
  BulkEmailDestination,
  BulkEmailDestinationStatus,
  SendBulkTemplatedEmailCommand,
  SESServiceException,
} from '@aws-sdk/client-ses'
import { logger } from './logger'

function splitEmails(emails: string[]) {
  const pages: Array<string[]> = []
  //50 being the max number of emails the BulkTemplate command accepts
  const pageSize = 50
  for (let i = 0; i < emails.length; i += pageSize) {
    pages.push(emails.slice(i, i + pageSize))
  }
  return pages
}

function createTrackingUpdateCommand(addresses: string[], code: string) {
  const destinations: BulkEmailDestination[] =
    addresses.map<BulkEmailDestination>((email) => {
      return {
        Destination: {
          ToAddresses: [email],
        },
      }
    })

  const templateData = {
    code: code,
  }

  return new SendBulkTemplatedEmailCommand({
    Template: 'YamlEmailTemplate3',
    Destinations: destinations,
    Source: "Gift 'n Grow <no-reply@giftngrow.com>",
    DefaultTemplateData: JSON.stringify(templateData),
  })
}

class EmailManager {
  async sendTrackingUpdates(addresses: string[], code: string) {
    const batches = splitEmails(addresses)
    const output: Array<BulkEmailDestinationStatus[] | SESServiceException> = []

    for (const batch of batches) {
      const sendCommand = createTrackingUpdateCommand(batch, code)
      try {
        const data = await emailClient.send(sendCommand)
        output.push(data.Status!)
      } catch (e) {
        logger.error(e, 'Tracking Email Batch Failed')
        output.push(e as SESServiceException)
      }
    }
    return output
  }
}

const emailManager = new EmailManager()
export { emailManager }
