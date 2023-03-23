import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { ITrackingCode } from '../lib/entities/trackingCode.entity'
import { useUserAPI } from '../hooks/useUserAPI'

function useGetCodesQuery() {
  const userAPI = useUserAPI()
  return useQuery<ITrackingCode[], AxiosError>(
    ['codes', userAPI.email],
    async () => {
      return userAPI.getTrackingCodes()
    },
  )
}

export { useGetCodesQuery }
