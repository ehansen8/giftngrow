/**
 * @jest-environment node
 */
import { encode } from 'next-auth/jwt'
import handler, {
  secureCookiesEnabled,
  sessionCookieName,
} from '../../../../src/pages/api/auth/google-callback'
import { ensureUser } from '../../../../src/lib/ensureUser'

// The handler constructs its OAuth2Client at module load, so the stub has to be
// in place before the import rather than set per test.
const mockVerifyIdToken = jest.fn()
jest.mock('google-auth-library', () => ({
  OAuth2Client: jest.fn(() => ({
    verifyIdToken: (...args: unknown[]) => mockVerifyIdToken(...args),
  })),
}))
jest.mock('next-auth/jwt', () => ({ encode: jest.fn() }))
jest.mock('../../../../src/lib/ensureUser', () => ({ ensureUser: jest.fn() }))

const buildRes = () => {
  const res: Record<string, jest.Mock> = {
    redirect: jest.fn(() => res),
    status: jest.fn(() => res),
    setHeader: jest.fn(() => res),
    end: jest.fn(() => res),
  }
  return res as any
}

const buildReq = (overrides: Record<string, unknown> = {}) => ({
  method: 'POST',
  body: { credential: 'id-token', g_csrf_token: 'tok' },
  cookies: { g_csrf_token: 'tok' },
  ...overrides,
})

const payload = {
  email: 'alex@example.com',
  email_verified: true,
  given_name: 'Alex',
  picture: 'https://example.com/a.png',
  sub: '12345',
}

describe('google-callback', () => {
  beforeEach(() => {
    mockVerifyIdToken.mockResolvedValue({ getPayload: () => payload })
    jest.mocked(encode).mockResolvedValue('session-jwt')
  })

  afterEach(() => jest.clearAllMocks())

  it('rejects anything but POST', async () => {
    const res = buildRes()
    await handler(buildReq({ method: 'GET' }) as any, res)
    expect(res.status).toHaveBeenCalledWith(405)
  })

  it.each([
    ['the body token is missing', { body: { credential: 'id-token' } }],
    ['the cookie is missing', { cookies: {} }],
    [
      'the two do not match',
      { cookies: { g_csrf_token: 'other' } },
    ],
  ])('rejects when %s', async (_name, overrides) => {
    const res = buildRes()
    await handler(buildReq(overrides) as any, res)
    expect(res.redirect).toHaveBeenCalledWith(303, '/auth/login?error=csrf')
    expect(res.setHeader).not.toHaveBeenCalledWith(
      'Set-Cookie',
      expect.anything(),
    )
  })

  it('rejects a credential Google will not verify', async () => {
    mockVerifyIdToken.mockRejectedValue(new Error('Invalid token signature'))
    const res = buildRes()

    await handler(buildReq() as any, res)

    expect(res.redirect).toHaveBeenCalledWith(
      303,
      '/auth/login?error=invalid_token',
    )
    expect(encode).not.toHaveBeenCalled()
  })

  it('rejects an unverified Google email', async () => {
    mockVerifyIdToken.mockResolvedValue({
      getPayload: () => ({ ...payload, email_verified: false }),
    })
    const res = buildRes()

    await handler(buildReq() as any, res)

    expect(res.redirect).toHaveBeenCalledWith(
      303,
      '/auth/login?error=unverified_email',
    )
    expect(encode).not.toHaveBeenCalled()
  })

  it('verifies against the app client id, not the token issuer claim', async () => {
    await handler(buildReq() as any, buildRes())

    expect(mockVerifyIdToken).toHaveBeenCalledWith({
      idToken: 'id-token',
      audience: process.env.NEXT_PUBLIC_GOOGLE_ID,
    })
  })

  it('creates the user and sets an httpOnly session cookie', async () => {
    const res = buildRes()

    await handler(buildReq() as any, res)

    expect(ensureUser).toHaveBeenCalledWith({
      email: 'alex@example.com',
      firstName: 'Alex',
    })

    const [header, value] = res.setHeader.mock.calls[0]
    expect(header).toBe('Set-Cookie')
    expect(value).toContain(`${sessionCookieName()}=session-jwt`)
    expect(value).toContain('HttpOnly')
    expect(value).toContain('SameSite=Lax')
    expect(res.redirect).toHaveBeenCalledWith(303, '/')
  })
})

describe('secureCookiesEnabled', () => {
  const original = process.env.NEXTAUTH_URL
  afterEach(() => {
    process.env.NEXTAUTH_URL = original
  })

  it.each([
    ['https://track.giftngrow.com', true],
    // next-auth prefixes a scheme-less value with https://, so this is secure.
    ['localhost', true],
    ['track.giftngrow.com', true],
    ['http://localhost:3000', false],
  ])('treats %s as secure=%s', (url, expected) => {
    process.env.NEXTAUTH_URL = url
    expect(secureCookiesEnabled()).toBe(expected)
  })

  it('is insecure when NEXTAUTH_URL is unset', () => {
    delete process.env.NEXTAUTH_URL
    expect(secureCookiesEnabled()).toBe(false)
  })
})
