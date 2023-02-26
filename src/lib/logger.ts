import pino from 'pino'
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare'

// create pino-logflare stream
const stream = createWriteStream({
  apiKey: process.env.NEXT_PUBLIC_LOG_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOG_TOKEN,
})

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: process.env.NEXT_PUBLIC_LOG_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOG_TOKEN,
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
