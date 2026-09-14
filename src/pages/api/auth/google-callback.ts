import { OAuth2Client } from 'google-auth-library'
import { NextApiRequest, NextApiResponse } from 'next'
import { encode } from 'next-auth/jwt'
import { ensureUser } from '../../../lib/ensureUser'

/** Matches next-auth's own default so a session minted here expires like any other. */
const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60

export const SIGN_IN_ERRORS = {
  csrf: 'csrf',
  missingCredential: 'missing_credential',
  invalidToken: 'invalid_token',
  unverifiedEmail: 'unverified_email',
} as const

type SignInError = (typeof SIGN_IN_ERRORS)[keyof typeof SIGN_IN_ERRORS]

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_ID)

/**
 * Mirrors next-auth's own parseUrl rule, which prefixes a scheme-less
 * NEXTAUTH_URL with https:// - so a bare `localhost` counts as secure and the
 * session cookie must carry the __Secure- prefix to be read back.
 */
export function secureCookiesEnabled() {
  const url = process.env.NEXTAUTH_URL
  if (!url) {
    return false
  }
  return (url.startsWith('http') ? url : `https://${url}`).startsWith('https://')
}

export function sessionCookieName() {
  return `${secureCookiesEnabled() ? '__Secure-' : ''}next-auth.session-token`
}

/** Mirrors next-auth's own session cookie attributes so it reads the result back. */
function serializeSessionCookie(sessionToken: string) {
  const attributes = [
    `${sessionCookieName()}=${sessionToken}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ]
  if (secureCookiesEnabled()) {
    attributes.push('Secure')
  }
  return attributes.join('; ')
}

function rejectTo(res: NextApiResponse, error: SignInError) {
  res.redirect(303, `/auth/login?error=${error}`)
}

/**
 * Receives the ID token that Google form-POSTs here in redirect UX mode, then
 * establishes the next-auth session directly. Google only accepts a login_uri
 * that exactly matches an authorized redirect URI on the OAuth client.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end()
    return
  }

  // Double-submit check: Google sets g_csrf_token as a cookie and repeats it in
  // the body, so a forged cross-site post cannot match both.
  const bodyToken = req.body?.g_csrf_token
  const cookieToken = req.cookies.g_csrf_token
  if (!bodyToken || !cookieToken || bodyToken !== cookieToken) {
    rejectTo(res, SIGN_IN_ERRORS.csrf)
    return
  }

  const credential = req.body?.credential
  if (!credential) {
    rejectTo(res, SIGN_IN_ERRORS.missingCredential)
    return
  }

  const payload = await client
    .verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_ID,
    })
    .then((ticket) => ticket.getPayload())
    .catch(() => undefined)

  if (!payload) {
    rejectTo(res, SIGN_IN_ERRORS.invalidToken)
    return
  }
  if (!payload.email || !payload.email_verified) {
    rejectTo(res, SIGN_IN_ERRORS.unverifiedEmail)
    return
  }

  await ensureUser({ email: payload.email, firstName: payload.given_name })

  const sessionToken = await encode({
    token: {
      name: payload.given_name,
      email: payload.email,
      picture: payload.picture,
      sub: payload.sub,
    },
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: SESSION_MAX_AGE_SECONDS,
  })

  res.setHeader('Set-Cookie', serializeSessionCookie(sessionToken))
  res.redirect(303, '/')
}
