import NextAuth, { AuthOptions, DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '../../../lib/entities/user.entity'
import { entityManager } from '../../../lib/entityManager'
import { serverInitiateAuth } from '../../../lib/cognitoManager'
import { JWT } from 'next-auth/jwt'
import jwtDecode from 'jwt-decode'
import { Logger } from 'aws-amplify'
const logger = new Logger('login', 'INFO')
interface SpecialUser extends DefaultUser {
  givenName?: string
  familyName?: string
}
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'google',
      name: 'Google',
      credentials: { credential: { type: 'text' } },
      authorize: async (credentials) => {
        const token = credentials?.credential
        const header = jwtDecode(token as string, { header: true }) as any
        const data = jwtDecode(token as string) as any
        logger.info(header, data)
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
        const profile: Profile = jwtDecode(
          res.AuthenticationResult?.IdToken as string,
        )
        const user: SpecialUser = {
          id: '',
          email: profile.email,
          givenName: profile.given_name,
          familyName: profile.family_name,
          name: profile.given_name,
        }
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
      return token
    },
    async session({ session, user, token }) {
      return session
    },
  },
}

export default NextAuth(authOptions)
