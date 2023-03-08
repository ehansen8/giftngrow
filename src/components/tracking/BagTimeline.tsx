import Timeline from '@mui/lab/Timeline'
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'
import TimelineEntry from '../TimelineEntry'
import { Entry } from '../../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { UseQueryResult } from 'react-query'
import CircularProgress from '@mui/material/CircularProgress'

export function BagTimeline({
  entriesQuery,
}: {
  entriesQuery: UseQueryResult<Entry[], AxiosError>
}) {
  const { data, isLoading, isError, error } = entriesQuery
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (!data) {
    return <></>
  }
  const entries = data

  return (
    <Timeline
      className='px-0'
      position='right'
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {entries.map((entry, idx) => {
        return (
          <TimelineEntry
            key={idx}
            entry={entry}
          />
        )
      })}
    </Timeline>
  )
}
