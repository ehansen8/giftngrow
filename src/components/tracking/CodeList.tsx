import { MenuItem } from '@mui/material'
import { UseQueryResult } from 'react-query'
import { TrackingCode } from '../../lib/entities/trackingCode.entity'
import { AxiosError } from 'axios'

export function CodeList({
  codesQuery,
  handleClick,
}: {
  codesQuery: UseQueryResult<TrackingCode[], AxiosError>
  handleClick: (code: string) => void
}) {
  const { data, isLoading, isError, error } = codesQuery
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
