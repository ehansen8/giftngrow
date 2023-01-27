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

const test_user = {
  email: 'cmtsmartin@hotmail.com',
  firstName: 'Evan',
  city: 'Flagstaff',
  state: 'AZ',
}
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

  return (
    <>
      <TrackingAppBar
        codesQuery={codesQuery}
        handleMenuClick={(code: string) => setActiveCode(code)}
      />
      <main
        className='py-4 rounded-md px-2'
        style={{ backgroundColor: 'white' }}
      >
        <StatsGrid activeCode={activeCode} />
        {(!codesQuery.data || codesQuery.data.length <= 0) && (
          <NoBagsView handleClick={() => setOpen(true)} />
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
    <Grid
      className='mt-0'
      container
      justifyContent='space-around'
    >
      {cards.map((card) => {
        return (
          <Grid
            key={card.value}
            item
            xs={3}
            className='w-auto'
          >
            <Card
              sx={{ backgroundColor: 'lightgrey' }}
              elevation={3}
            >
              <CardContent className='!py-1 h-full'>
                <div className='flex flex-col items-center'>
                  <Typography variant='h6'>{card.value}</Typography>
                  <Typography
                    variant='body2'
                    textAlign='center'
                    noWrap
                  >
                    {card.body}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  </>
)

const NoBagsView = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className='flex flex-col items-center gap-3 mt-3'>
      {
        //Weird Hydration Error with this Alert.
        //Fixed when strictmode is disabled
        //Hmm seems to be fixed after a restart and strictmode is true again
      }
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
        Register Code
      </Button>
    </div>
  )
}
