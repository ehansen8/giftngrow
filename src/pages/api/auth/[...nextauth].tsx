import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { parseJWT } from '../../../utils/parseJWT'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { entityManager } from '../../../lib/db'
import { User } from '../../../lib/entities/user.entity'

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
}
const adapter = DynamoDBAdapter(DynamoDBDocument.from(new DynamoDB(config)), {
  tableName: 'giftngrow.dev',
})

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'googletest',
      name: 'google-test',
      credentials: { credential: { type: 'text' } },
      authorize: async (credentials) => {
        const token = credentials?.credential
        const data = parseJWT(token as string)
        const { email, sub, name, given_name, family_name, email_verified } =
          data
        let user = await entityManager.findOne(User, {
          email: email,
        })

        //TODO: Redirect to custom signup screen for city/state/etc...
        if (!user) {
          user = await entityManager.create(
            new User({
              email: email as string,
              firstName: given_name as string,
              city: 'Test',
              state: 'AZ',
            }),
          )
        }
        //console.log(user)
        return user as any
      },
    }),
  ],
}

export default NextAuth(authOptions)
