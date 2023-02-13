import PDFDocument from 'pdfkit'
import QRCode from 'qrcode'

const mod = BigInt(2) ** BigInt(25) // highest 2^k less than 19^6
const a = BigInt(95929) // prime multiplier mod 4 == 1
const c = BigInt(17) // prime adder mod 2 == 1
const char_set = 'BCGHJKLMNPQRSTVWXYZ'

function genCode(prev: bigint) {
  const nxt = (a * prev + c) % mod
  let temp = nxt
  let output = ''
  for (let i = 0; i < 6; i++) {
    const index = temp % BigInt(19)
    output += char_set[Number(index)]
    temp = temp / BigInt(19)
  }
  return { value: nxt, code: output }
}

class CodeGenerator {
  getPDFBuffer() {
    const doc = new PDFDocument({ size: 'LETTER', bufferPages: true })
    doc.text('This is a test PDF')
    return doc
  }

  getCodes(numPages: number) {
    let prev = BigInt(1)

    const pages: string[][] = []
    for (let i = 0; i < numPages; i++) {
      const page: string[] = []
      for (let j = 0; j < 25; j++) {
        const { value, code } = genCode(prev)
        prev = value
        page.push(code)
      }
      pages.push(page)
    }
    return pages
  }

  async createPage(page: string[]) {}

  async getPDF(numPages: number) {
    const doc = new PDFDocument({ size: 'LETTER', margin: 0 })
    const pages = this.getCodes(numPages)
    const start_x = 6 //old: 36
    const start_y = 0 //old: 36
    const width = 120 //1.5": 108
    const height = 156 //144
    const image_width = 54

    for (let i = 0; i < numPages; i++) {
      const page = pages[i]
      if (i != 0) doc.addPage()
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const code = page[y + 5 * x]
          const x_off = start_x + x * width
          const y_off = start_y + y * height
          const text_x = x_off
          const text_y = y_off + width
          const spacing = (width - image_width) / 2
          const image_x = x_off + spacing
          const image_y = y_off + spacing
          const qr_png = await QRCode.toDataURL(
            `https://giftngrow.com?code=${code}`,
            {
              margin: 0,
            },
          )

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
