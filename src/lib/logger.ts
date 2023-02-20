import pino from 'pino'
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare'

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: 'fH6XRYbngjDH',
  sourceToken: '709af0bc-f2e5-41ea-b3e5-12a751dd512d',
})

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: 'fH6XRYbngjDH',
  sourceToken: '709af0bc-f2e5-41ea-b3e5-12a751dd512d',
})

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
  },
  stream,
)
export { logger }
