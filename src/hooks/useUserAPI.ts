import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { UserAPI } from '../apis/UserAPI'

export function useUserAPI() {
  const email = useSession().data?.user?.email
  const [userAPI, setUserAPI] = useState(new UserAPI(email))

  useEffect(() => {
    setUserAPI(new UserAPI(email))
  }, [email])

  return userAPI
}
