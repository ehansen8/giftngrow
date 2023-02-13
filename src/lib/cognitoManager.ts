import 'reflect-metadata'
import {
  AdminInitiateAuthCommand,
  AdminInitiateAuthCommandInput,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandInput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ForgotPasswordCommand,
  ForgotPasswordCommandInput,
  ResendConfirmationCodeCommand,
  ResendConfirmationCodeCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider'
import { cognitoClient } from './cognitoClient'

const client = cognitoClient

const baseInput = {
  AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
  UserPoolId: 'us-east-2_kaJAEgp0b',
  ClientId: process.env.COGNITO_CLIENT_ID,
}

async function serverInitiateAuth({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const input: AdminInitiateAuthCommandInput = {
    ...baseInput,
    AuthParameters: { USERNAME: email, PASSWORD: password },
  }
  const command = new AdminInitiateAuthCommand(input)
  const res = client.send(command)
  return res
}

async function serverSignUp({
  email,
  password,
  given_name,
  family_name,
}: {
  email: string
  password: string
  given_name: string
  family_name: string
}) {
  const input: SignUpCommandInput = {
    ...baseInput,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: 'given_name',
        Value: given_name,
      },
      {
        Name: 'family_name',
        Value: family_name,
      },
    ],
  }
  const command = new SignUpCommand(input)
  const res = client.send(command)
  return res
}

async function serverConfirmSignUp({
  email,
  code,
}: {
  email: string
  code: string
}) {
  const input: ConfirmSignUpCommandInput = {
    ...baseInput,
    Username: email,
    ConfirmationCode: code,
  }

  const command = new ConfirmSignUpCommand(input)
  const res = client.send(command)
  return res
}

async function serverSendCofirmationCode({ email }: { email: string }) {
  const input: ResendConfirmationCodeCommandInput = {
    ...baseInput,
    Username: email,
  }

  const command = new ResendConfirmationCodeCommand(input)
  const res = client.send(command)
  return res
}

async function serverSendRecoveryCode({ email }: { email: string }) {
  const input: ForgotPasswordCommandInput = {
    ...baseInput,
    Username: email,
  }

  const command = new ForgotPasswordCommand(input)
  const res = client.send(command)
  return res
}
async function serverConfirmForgotPassword({
  email,
  code,
  password,
}: {
  email: string
  code: string
  password: string
}) {
  const input: ConfirmForgotPasswordCommandInput = {
    ...baseInput,
    Username: email,
    ConfirmationCode: code,
    Password: password,
  }

  const command = new ConfirmForgotPasswordCommand(input)
  const res = client.send(command)
  return res
}

export {
  serverInitiateAuth,
  serverSignUp,
  serverConfirmSignUp,
  serverSendCofirmationCode,
  serverSendRecoveryCode,
  serverConfirmForgotPassword,
}
