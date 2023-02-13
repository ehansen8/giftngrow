import { NextApiRequest, NextApiResponse } from 'next'
import { codeGenerator } from '../../lib/codeGenerator'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const pdf = await codeGenerator.getPDF()
  //   const buffers: any[] = []
  //   pdf.on('data', buffers.push.bind(buffers))
  //   pdf.on('end', () => {
  //     let pdfData = Buffer.concat(buffers)
  //     res
  //       .writeHead(200, {
  //         'Content-Length': Buffer.byteLength(pdfData),
  //         'Content-Type': 'application/pdf',
  //         'Content-disposition': 'attachment;filename=test.pdf',
  //       })
  //       .end(pdfData)
  //   })\
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': 'attachment;filename=test.pdf',
  })
  pdf.pipe(res)
  pdf.end()
}
