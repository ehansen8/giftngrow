import { MenuItem } from '@mui/material'
import { UseQueryResult } from 'react-query'
import { TrackingCode } from '../../lib/entities/trackingCode.entity'
import { AxiosError } from 'axios'
import { useGetCodesQuery } from '../../queries/getCodesQuery'

export function CodeList({
  handleClick,
}: {
  handleClick: (code: string) => void
}) {
  const { data, isLoading, isError, error } = useGetCodesQuery()
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (!data || data.length == 0) {
    return (
      <span
        className='text-center'
        style={{ width: '100px', display: 'block' }}
      >
        No Codes
      </span>
    )
  }

  return (
    <>
      {data.map(({ code }) => (
        <MenuItem
          key={code}
          onClick={() => handleClick(code)}
        >
          {code}
        </MenuItem>
      ))}
    </>
  )
}
