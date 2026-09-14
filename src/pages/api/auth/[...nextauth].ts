import NextAuth, { AuthOptions, DefaultUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ensureUser } from '../../../lib/ensureUser'
import { serverInitiateAuth } from '../../../lib/cognitoManager'
import { JWT } from 'next-auth/jwt'
import jwtDecode from 'jwt-decode'

interface SpecialUser extends DefaultUser {
  givenName?: string
  familyName?: string
}
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
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
  debug: process.env.AWS_BRANCH === 'prod' ? false : true,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user }: { token: JWT; user?: SpecialUser }) {
      if (user && user.email) {
        await ensureUser({ email: user.email, firstName: user.givenName })
      }
      return token
    },
    async session({ session, user, token }) {
      return session
    },
  },
}

export default NextAuth(authOptions)
