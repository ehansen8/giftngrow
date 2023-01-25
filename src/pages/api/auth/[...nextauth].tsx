import NextAuth, { AuthOptions, DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import CognitoProvider from 'next-auth/providers/cognito'
import { parseJWT } from '../../../utils/parseJWT'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { User } from '../../../lib/entities/user.entity'
import { ddbClient } from '../../../lib/ddbClient'
import { entityManager } from '../../../lib/entityManager'
import { serverInitiateAuth } from '../../../lib/cognitoManager'
import { getToken, JWT } from 'next-auth/jwt'

const adapter = DynamoDBAdapter(DynamoDBDocument.from(ddbClient), {
  tableName: 'giftngrow.dev',
})
interface SpecialUser extends DefaultUser {
  givenName?: string
  familyName?: string
}
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      trustHost: true
      id: 'google',
      name: 'Google',
      credentials: { credential: { type: 'text' } },
      authorize: async (credentials) => {
        const token = credentials?.credential
        const data = parseJWT(token as string)
        const { email, name, given_name, family_name } = data
        const user: SpecialUser = {
          id: '',
          email: email,
          givenName: given_name,
          familyName: family_name,
          name: given_name,
        }
        return user
      },
    }),
    CredentialsProvider({
      trustHost: true,
      id: 'cognito',
      name: 'Cognito',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'text',
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }
        const res = await serverInitiateAuth({ ...credentials })
        type Profile = {
          given_name?: string
          family_name?: string
          email?: string
        }
        const profile: Profile = parseJWT(
          res.AuthenticationResult?.IdToken as string,
        )
        const user: SpecialUser = {
          id: '',
          email: profile.email,
          givenName: profile.given_name,
          familyName: profile.family_name,
          name: profile.given_name,
        }
        user.name = user.givenName + ' ' + user.familyName
        return user
      },
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user }: { token: JWT; user?: SpecialUser }) {
      if (user && user.email) {
        const dbUser = new User(user.email)
        dbUser.firstName = user?.givenName

        const foundUser = await entityManager.findOne(dbUser)
        if (!foundUser) {
          entityManager.create(dbUser)
        }
      }
      token.maxAge = 0
      return token
    },
    async session({ session, user, token }) {
      return session
    },
  },
}

export default NextAuth(authOptions)
