import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import axios from 'axios'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { useSession } from 'next-auth/react'

function useGetCodesQuery() {
  const { data: session } = useSession()
  const email = session?.user?.email
  return useQuery<TrackingCode[], AxiosError>(['codes', email], async () => {
    const { data } = await axios.get<TrackingCode[]>(
      `/api/users/${email}/codes`,
    )
    return data
  })
}

export { useGetCodesQuery }
