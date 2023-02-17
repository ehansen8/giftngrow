import { useEffect, useState } from 'react'
import { useSession, signIn, SignInOptions } from 'next-auth/react'
import { useRouter } from 'next/router'

interface OneTapSigninOptions {
  parentContainerId?: string
}

const useOneTapSignin = (
  opt?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>,
) => {
  const { parentContainerId } = opt || {}
  const { status } = useSession()
  const router = useRouter()
  // Loading status of the next-auth login process, not the useSession status
  const [isLoading, setIsLoading] = useState(false)

  //This handles loading & authenticated statuses
  const needsSignIn = status === 'unauthenticated'

  useEffect(() => {
    const handleCallback = async (
      response: google.accounts.id.CredentialResponse,
    ) => {
      setIsLoading(true)
      try {
        const res = await signIn('google', {
          credential: response.credential,
          redirect: false,
        })
        router.push('/tracking')
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
      //TODO: error handling
    }

    if (!isLoading) {
      const { google } = window
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
          callback: handleCallback,
          prompt_parent_id: parentContainerId,
        })

        // Here we just console.log some error situations and reason why the google one tap
        // is not displayed. You may want to handle it depending on yuor application
        if (needsSignIn) {
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
    }
  }, [isLoading, needsSignIn, parentContainerId, router])

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
