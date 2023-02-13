import PDFDocument from 'pdfkit'
import { off } from 'process'
import QRCode from 'qrcode'

class CodeGenerator {
  getPDFBuffer() {
    const doc = new PDFDocument({ size: 'LETTER', bufferPages: true })
    doc.text('This is a test PDF')
    return doc
  }
  async getPDF() {
    const doc = new PDFDocument({ size: 'LETTER', margin: 0 })
    const start = 36
    const width = 108
    const height = 144
    const qr_png = await QRCode.toDataURL('https://giftngrow.com?code=000081', {
      margin: 2,
    })
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const x_off = start + x * width
        const y_off = start + y * height
        const text_x = x_off
        const text_y = y_off + width
        const image_width = 100
        const image_x = x_off + (width - image_width) / 2
        const image_y = y_off
        doc.rect(x_off, y_off, width, height)
        doc.image(qr_png, image_x, image_y, {
          width: image_width,
          height: image_width,
        })
        doc.stroke()
        doc.fontSize(12)
        doc.text('Track Your Wrap', text_x, text_y - 6, {
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
        doc.text('Your ID: 000081', {
          width: width,
          align: 'center',
        })
      }
    }

    return doc
  }
}

const codeGenerator = new CodeGenerator()
export { codeGenerator }
