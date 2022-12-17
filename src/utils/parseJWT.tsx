export function parseJWT(token: string) {
  const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  return data
}
