import { NextApiRequest, NextApiResponse } from 'next'
import { entityManager } from '../../../lib/entityManager'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await entityManager.allUsers()
  res.json(users)
}
