import { NextApiRequest, NextApiResponse } from 'next'

import { SignUpParams } from '../../../types/general'

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  res.json('Nothing Here Currently')
}
