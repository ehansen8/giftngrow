import { render } from '@testing-library/react'
import { StrictMode } from 'react'
import {
  GOOGLE_CALLBACK_PATH,
  GoogleIdentity,
} from '../../src/components/GoogleIdentity'

const initialize = jest.fn()

const getConfig = () => initialize.mock.calls[0][0]

describe('GoogleIdentity', () => {
  beforeEach(() => {
    ;(window as any).google = { accounts: { id: { initialize } } }
  })

  afterEach(() => {
    jest.resetAllMocks()
    delete (window as any).google
  })

  it('initializes once across re-renders', () => {
    const { rerender } = render(<GoogleIdentity />)
    rerender(<GoogleIdentity />)

    expect(initialize).toHaveBeenCalledTimes(1)
  })

  it('initializes once under StrictMode double-invoked effects', () => {
    render(
      <StrictMode>
        <GoogleIdentity />
      </StrictMode>,
    )

    expect(initialize).toHaveBeenCalledTimes(1)
  })

  it('uses redirect mode so the credential never travels through window.opener', () => {
    render(<GoogleIdentity />)

    expect(getConfig()).toMatchObject({
      ux_mode: 'redirect',
      login_uri: `${window.location.origin}${GOOGLE_CALLBACK_PATH}`,
    })
    // One Tap is the only consumer of callback, and it cannot coexist with
    // login_uri.
    expect(getConfig().callback).toBeUndefined()
  })

  it('does nothing when the Google script has not loaded', () => {
    delete (window as any).google

    expect(() => render(<GoogleIdentity />)).not.toThrow()
    expect(initialize).not.toHaveBeenCalled()
  })
})
