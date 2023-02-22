import { ProvisionedThroughputExceededException } from '@aws-sdk/client-dynamodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { codeGenerator } from '../../../lib/codeGenerator'
import { IndexCounter } from '../../../lib/entities/indexCounter.entity'
import { Item } from '../../../lib/entities/item.entity'
import { entityManager } from '../../../lib/entityManager'
import { logger } from '../../../lib/logger'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const numPages = parseInt(req.query.pages as string)
  const latest = await entityManager.findOne(new IndexCounter(), {
    consistantRead: true,
  })
  const pages = codeGenerator.getCodes(numPages, latest)

  /**
   * Strategy is to attempt a batch load of the following pages
   * If a batch fails, it exits the loop but then creates a pdf of the successful batches
   */
  let pagesSaved = 0
  try {
    for (let page of pages) {
      const items = Item.fromPage(page)
      const data = await entityManager.createBatch(items)
      //Update the Count using the last item in the page
      await entityManager.create(IndexCounter.fromItem(items[24])) //all batches are 25 in length
      if (
        data.UnprocessedItems &&
        Object.keys(data.UnprocessedItems).length > 0
      ) {
        logger.fatal(
          data.UnprocessedItems,
          'UnprocessedItems during code generation',
        )
      }
      pagesSaved++
    }
  } catch (e) {
    if (e instanceof ProvisionedThroughputExceededException) {
      logger.warn(e, 'Throughput Exceeded')
    } else {
      logger.error(e, 'Uncaught code generation error')
      throw e
    }
  }
  const pdf = await codeGenerator.createPDF(pages.slice(0, pagesSaved))
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
  })
  pdf.pipe(res)
  pdf.end()
}
