import { Typography, Button, Card, CardContent, Grid } from '@mui/material'
import Alert from '@mui/material/Alert'
import { colors } from '../colors'
import { useState } from 'react'
import Timeline from '@mui/lab/Timeline'
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'
import TimelineEntry from '../components/TimelineEntry'
import TrackingAppBar from '../components/TrackingAppBar'
import { Entry } from '../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import fetchEntries from '../services/fetchEntries'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { User } from '../lib/entities/user.entity'
import fetchCodes from '../services/fetchCodes'
import { getSession, useSession } from 'next-auth/react'
import AddCodeModal from '../components/AddCodes/AddCodeModal'
import { AppContext } from 'next/app'

const cards = [
  {
    value: 43,
    body: 'Cities',
  },
  {
    value: 15,
    body: 'States',
  },
  {
    value: 1003,
    body: 'Times Gifted',
  },
]

export default function Tracking() {
  const { data: session } = useSession()
  const user = session?.user
  const [activeCode, setActiveCode] = useState<string | undefined>(undefined)
  const codesQuery = useQuery<TrackingCode[], AxiosError>(
    ['codes', user],
    () => fetchCodes(user as User),
    { enabled: !!user },
  )
  const entriesQuery = useQuery<Entry[], AxiosError>(
    ['entries', activeCode],
    () => fetchEntries(activeCode as string),
    { enabled: !!activeCode },
  )

  const [open, setOpen] = useState(false)

  function handleAddCode() {
    setOpen(true)
  }

  return (
    <>
      <TrackingAppBar
        codesQuery={codesQuery}
        handleMenuClick={(code: string) => setActiveCode(code)}
        handleAddCode={handleAddCode}
      />
      <main
        className='py-4 rounded-md px-2'
        style={{ backgroundColor: 'white' }}
      >
        <StatsGrid activeCode={activeCode} />
        {(!codesQuery.data || codesQuery.data.length <= 0) && (
          <NoBagsView handleClick={handleAddCode} />
        )}
        <BagTimeline entriesQuery={entriesQuery} />
        <AddCodeModal
          open={open}
          setOpen={setOpen}
        />
      </main>
    </>
  )
}

const BagTimeline = ({
  entriesQuery,
}: {
  entriesQuery: UseQueryResult<Entry[], AxiosError>
}) => {
  const { data, isLoading, isError, error } = entriesQuery
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (!data) {
    return <></>
  }
  const entries = data

  return (
    //TODO: why is this like this??
    //@ts-ignore
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

const StatsGrid = ({ activeCode }: { activeCode?: string }) => (
  <>
    <Typography
      className='rounded-full mb-3 border-solid border-2'
      variant='h6'
      textAlign='center'
      sx={{
        borderColor: colors.green,
        backgroundColor: 'inherit',
        width: '75%',
        margin: 'auto',
        color: colors.dark,
      }}
    >
      {activeCode ? 'Tracking Code: ' + activeCode : 'All Tracking Code Stats'}
    </Typography>
    <div
      className='mt-0'
      style={{
        display: 'grid',
        width: '100%',
        height: 'max-content',
        gridTemplateRows: 'repeat(1, auto)',
        gridTemplateColumns: 'repeat(3, minmax(auto, max-content))',
        justifyContent: 'space-around',
      }}
    >
      {cards.map((card) => {
        return (
          <Card
            key={card.value}
            sx={{
              backgroundColor: '#41BEBB',
              aspectRatio: '1/1',
              height: '100%',
            }}
            elevation={4}
            className='rounded-full'
          >
            <CardContent className='!p-2 h-full rounded-full'>
              <div className='flex flex-col items-center h-full justify-center text-black'>
                <Typography
                  fontSize={18}
                  variant='h6'
                  className=''
                >
                  {card.value}
                </Typography>
                <Typography
                  variant='body1'
                  textAlign='center'
                  noWrap
                  className='mb-4'
                >
                  {card.body}
                </Typography>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  </>
)

const NoBagsView = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className='flex flex-col items-center gap-3 mt-3'>
      <Alert
        severity='info'
        variant='outlined'
      >
        Looks like you have no registered tracking codes. To get started, click
        the button below!
      </Alert>

      <Button
        variant='outlined'
        onClick={handleClick}
      >
        <Typography
          variant='button'
          fontSize={15}
        >
          Add Code
        </Typography>
      </Button>
    </div>
  )
}
