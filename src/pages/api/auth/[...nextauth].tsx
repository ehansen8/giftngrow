import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parseJWT } from '../../../utils/parseJWT'
import { User } from 'next-auth/core/types'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'googletest',
      name: 'google-test',
      credentials: { credential: { type: 'text' } },
      authorize: async (credentials) => {
        const token = credentials?.credential
        console.log(token)
        const data = parseJWT(token as string)
        console.log(data)
        return data
      },
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
