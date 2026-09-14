import { User } from './entities/user.entity'
import { entityManager } from './entityManager'

interface EnsureUserInput {
  email: string
  firstName?: string
}

/** Creates the user row on first sign-in. Safe to call on every sign-in. */
export async function ensureUser({ email, firstName }: EnsureUserInput) {
  const user = new User(email)
  user.firstName = firstName

  const found = await entityManager.findOne(user)
  if (!found) {
    await entityManager.create(user)
  }
}
