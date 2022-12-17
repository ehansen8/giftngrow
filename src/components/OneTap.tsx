import { useEffect, useState } from 'react'
import { useSession, signIn, SignInOptions } from 'next-auth/react'
import { debug } from 'console'

interface OneTapSigninOptions {
  parentContainerId?: string
}

const useOneTapSignin = (
  opt?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>,
) => {
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const { parentContainerId } = opt || {}
  const [isLoading, setIsLoading] = useState(false)

  const handleCallback = async (
    response: google.accounts.id.CredentialResponse,
  ) => {
    debugger
    console.log(response)
    signIn('googletest', { credential: response.credential, redirect: true })
  }

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      const { google } = window
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
          callback: handleCallback,
          prompt_parent_id: parentContainerId,
        })

        // Here we just console.log some error situations and reason why the google one tap
        // is not displayed. You may want to handle it depending on yuor application
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log(notification.getNotDisplayedReason())
          } else if (notification.isSkippedMoment()) {
            console.log(notification.getSkippedReason())
          } else if (notification.isDismissedMoment()) {
            console.log(notification.getDismissedReason())
          }
        })
      }
    }
  }, [isLoading, isSignedIn, parentContainerId])

  return { isLoading }
}
export const OneTap = () => {
  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: false,
    parentContainerId: 'oneTap',
  })

  return (
    <div
      id='oneTap'
      style={{ position: 'absolute', top: '50', right: '0' }}
    />
  )
}
