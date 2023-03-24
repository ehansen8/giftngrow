import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { IEntry } from '../lib/entities/entry.entity'
import { useTrackingStore } from '../stores/trackingStore'
import { CodeAPI } from '../apis/CodeAPI'

function useGetEntriesQuery() {
  const activeCode = useTrackingStore((state) => state.activeCode)

  return useQuery<IEntry[] | undefined, AxiosError>(
    ['entries', activeCode],
    async () => {
      //TODO handle throwing error if status is not okay
      const { data } = await CodeAPI.getEntries(activeCode)
      return data
    },
  )
}

export { useGetEntriesQuery }
