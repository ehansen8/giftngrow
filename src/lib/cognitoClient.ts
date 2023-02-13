import {
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
} from '@aws-sdk/client-cognito-identity-provider'

const config: CognitoIdentityProviderClientConfig = {
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
  },
  region: 'us-east-2',
}

const cognitoClient = new CognitoIdentityProviderClient(config)
export { cognitoClient }
