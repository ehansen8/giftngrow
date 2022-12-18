import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
} from '@mui/material'
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
  const [user, setUser] = useState<User | undefined>(test_user as User)
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
        {!codesQuery.data && <NoBagsView />}
        <BagTimeline entriesQuery={entriesQuery} />
      </main>
    </>
  )
}

/* const entries = [
  {
    regDate: 1671747311000,
    giverFN: 'Evan',
    recipFN: 'Claire',
    giverCity: 'Flagstaff',
    recipCity: 'Milwaukee',
    giverState: 'AZ',
    recipState: 'WI',
    gift: 'New Socks',
    occasion: 'Christmas',
    comment: 'Merry Christmas ligma nuts ',
    bagId: '000081',
    pk: '000081',
  },
  {
    regDate: 1671747311000,
    giverFN: 'Evan',
    recipFN: 'Claire',
    giverCity: 'Flagstaff',
    recipCity: 'Milwaukee',
    giverState: 'AZ',
    recipState: 'WI',
    gift: 'New Socks',
    occasion: 'Christmas',
    comment: 'Merry Christmas ligma nuts ',
    bagId: '000081',
    pk: '000081',
  },
  {
    regDate: 1671747311000,
    giverFN: 'Evan',
    recipFN: 'Claire',
    giverCity: 'Flagstaff',
    recipCity: 'Milwaukee',
    giverState: 'AZ',
    recipState: 'WI',
    gift: 'New Socks',
    occasion: 'Christmas',
    comment: 'Merry Christmas ligma nuts ',
    bagId: '000081',
    pk: '000081',
  },
] */
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
      {activeCode ? '# ' + activeCode : 'All Bag Stats'}
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

const NoBagsView = () => {
  return (
    <div className='flex flex-col items-center gap-3 mt-3'>
      <Alert
        severity='info'
        variant='outlined'
      >
        Looks like you have no registered tracking codes. To get started, click
        the button below!
      </Alert>

      <Button variant='outlined'>Register Code</Button>
    </div>
  )
}
