import { NextApiRequest, NextApiResponse } from 'next'
import { codeGenerator } from '../../lib/codeGenerator'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const pages = parseInt(req.query.pages as string)

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
  const pdf = await codeGenerator.getPDF(pages)
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': 'attachment;filename=test.pdf',
  })
  pdf.pipe(res)
  pdf.end()
}
