import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'
import { IndexCounter } from './entities/indexCounter.entity'

const MOD = BigInt(2) ** BigInt(25) // highest 2^k less than 19^6
const MULTIPLIER = BigInt(95929) // prime multiplier mod 4 == 1
const CONSTANT = BigInt(17) // prime adder mod 2 == 1
const CHAR_SET = 'BCGHJKLMNPQRSTVWXYZ'

function genCode(prev: bigint) {
  const nxt = (MULTIPLIER * prev + CONSTANT) % MOD
  let temp = nxt
  let output = ''
  for (let i = 0; i < 6; i++) {
    const index = temp % BigInt(19)
    output += CHAR_SET[Number(index)]
    temp = temp / BigInt(19)
  }
  return { value: nxt, code: output }
}

export function reverseCodeMap(code: string) {
  let value = BigInt(0)
  const base = BigInt(19)
  let power = BigInt(0)
  for (let char of code.split('')) {
    const index = CHAR_SET.indexOf(char)
    value += BigInt(index) * base ** power
    power += BigInt(1)
  }
  return value
}
export type PageItem = {
  code: string
  index: number
}
class CodeGenerator {
  /**
   *
   * @param numPages The number of pages to create
   * @param lastCode The last generated string from the LCG sequence
   * @returns A list of code batches of size 25
   */
  getCodes(numPages: number, latest?: IndexCounter) {
    const pages: PageItem[][] = []
    let index = 0
    let lastElement = BigInt(0)
    if (latest) {
      index = (latest.index as number) + 1
      lastElement = reverseCodeMap(latest.code as string)
    }

    for (let i = 0; i < numPages; i++) {
      const page: PageItem[] = []
      for (let j = 0; j < 25; j++) {
        const { value, code } = genCode(lastElement)
        lastElement = value
        page.push({ code, index })
        index++
      }
      pages.push(page)
    }
    return pages
  }

  async createPage(page: string[]) {}

  async createPDF(pages: PageItem[][]) {
    const doc = new PDFDocument({ size: 'LETTER', margin: 0 })
    const start_x = 6 //old: 36
    const start_y = 0 //old: 36
    const width = 120 //1.5": 108
    const height = 156 //144
    const image_width = 54
    const qr_png = await QRCode.toDataURL(`https://giftngrow.com`, {
      margin: 0,
    })

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      if (i != 0) doc.addPage()
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const code = page[y + 5 * x].code
          const x_off = start_x + x * width
          const y_off = start_y + y * height
          const text_x = x_off
          const text_y = y_off + width
          const spacing = (width - image_width) / 2
          const image_x = x_off + spacing
          const image_y = y_off + spacing

          doc.image(qr_png, image_x, image_y, {
            width: image_width,
            height: image_width,
          })

          doc.stroke()
          doc.fontSize(12)
          doc.text('Track Your Wrap', text_x, text_y - 12, {
            width: width,
            align: 'center',
            lineGap: 0,
          })
          doc.fontSize(11)
          doc.text('www.giftngrow.com', {
            width: width,
            align: 'center',
            lineGap: 2,
          })
          doc.text(`Your ID: ${code}`, {
            width: width,
            align: 'center',
          })
        }
      }
    }
    return doc
  }
}

const codeGenerator = new CodeGenerator()
export { codeGenerator }
