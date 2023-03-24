import Timeline from '@mui/lab/Timeline'
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'
import TimelineEntry from '../TimelineEntry'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetEntriesQuery } from '../../queries/getEntriesQuery'

export function BagTimeline({}: {}) {
  const { data: entries, isLoading, isError, error } = useGetEntriesQuery()
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
  if (!entries) {
    return <></>
  }

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
