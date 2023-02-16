declare namespace NodeJS {
  interface ProcessEnv {
    DB_ACCESS_KEY_ID: string
    DB_SECRET_ACCESS_KEY: string
    NEXT_PUBLIC_GOOGLE_ID: string
    GOOGLE_SECRET: string
    COGNITO_CLIENT_ID: string
    COGNITO_USER_POOL_ID: string
    NEXTAUTH_SECRET: string
    TABLE_NAME: string
  }
}
