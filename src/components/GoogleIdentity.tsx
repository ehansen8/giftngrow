import { useEffect, useRef } from 'react'

export const GOOGLE_CALLBACK_PATH = '/api/auth/google-callback'

/**
 * Configures Google Identity Services for the app. GoogleButton renders against
 * this configuration, so it has to run before any button mounts.
 */
export const GoogleIdentity = () => {
  // Google keeps only the config from the last initialize() call, so a second
  // call unbinds any button already rendered by renderButton().
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) {
      return
    }
    const { google } = window
    if (google) {
      isInitialized.current = true
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
        // Redirect mode posts the credential to login_uri. Popup mode hands it
        // back through window.opener, which mobile Safari does not keep.
        ux_mode: 'redirect',
        login_uri: `${window.location.origin}${GOOGLE_CALLBACK_PATH}`,
      })
    }
  }, [])

  return null
}
