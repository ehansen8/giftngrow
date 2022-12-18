import 'reflect-metadata'
import { NextApiRequest, NextApiResponse } from 'next'
import { batchManager } from '../../lib/db'
import getEntriesFromCSV from '../../utils/getEntriesFromCSV'
import { WriteBatch } from '@typedorm/core'
import { TrackingCode } from '../../lib/entities/trackingCode.entity'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const manager = batchManager
  const lines = getEntriesFromCSV() as TrackingCode[]
  //console.log(lines[0])

  /* let start = 0
  const offset = 25
  let batches = 0
  let data
  while (start < lines.length) {
    const batchToWrite = new WriteBatch()
    lines.slice(start, start + offset).forEach((e) => {
      batchToWrite.addCreateItem(e)
    })

    const batchResponse = await manager.write(batchToWrite, {
      maxRetryAttempts: 3,
      requestsConcurrencyLimit: 2,
    })

    if (batchResponse.failedItems.length > 0) {
      data = batchResponse.failedItems
      break
    }

    batches++
    start += offset
  }

  res.json({
    total: lines.length,
    lastStart: start,
    batches_completed: batches,
    res: data,
  }) */
}
