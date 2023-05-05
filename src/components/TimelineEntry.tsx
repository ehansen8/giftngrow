import { Typography, Card, CardContent, Grid } from '@mui/material'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { IEntry } from '../lib/entities/entry.entity'
import { colors } from '../colors'
import { TimelineSeparator, TimelineConnector } from '@mui/lab'
import OverflowTip from './OverflowTip'

type TimelineEntryProps = {
  entry: IEntry
}
export default function TimelineEntry({ entry }: TimelineEntryProps) {
  const dt = new Date(entry.regDate * 1000)
  const date = `${dt.getMonth() + 1}/${dt.getDate()}`
  const year = dt.getFullYear()
  return (
    <TimelineItem className=''>
      <TimelineOppositeContent
        className='pl-0 pr-3 flex flex-col items-end'
        sx={{
          m: 'auto 0',
          color: colors.dark,
          flex: '0 0 50px !important',
        }}
        variant='body2'
      >
        <Typography>{date}</Typography>
        <Typography>{year}</Typography>
      </TimelineOppositeContent>
      <ConnectorDot />
      <TimelineContent>
        <EntryCard entry={entry} />
      </TimelineContent>
    </TimelineItem>
  )
}

const EntryCard = ({ entry }: { entry: IEntry }) => {
  const giverLOC = formatLocation(entry.giverCity, entry.giverState)
  const recipLOC = formatLocation(entry.recipCity, entry.recipState)
  return (
    <Card
      className='entry-card'
      //sx={{ backgroundColor: 'rgb' }}
      raised
      elevation={4}
    >
      <CardContent className='p-0 entry-card-content'>
        <div className='entry-card-header'>
          <h3>
            {entry.giverFN} {giverLOC && <LOC location={giverLOC}></LOC>}
          </h3>
        </div>
        <div className='entry-card-body '>
          <p>
            <strong>{entry.giverFN ? 'To:' : 'From:'}</strong>
            {entry.recipFN} {recipLOC && <LOC location={recipLOC}></LOC>}
          </p>
          {entry.gift && (
            <p>
              <strong>Gift:</strong> {entry.gift}
            </p>
          )}
          {entry.occasion && (
            <p>
              <strong>Occasion:</strong> {entry.occasion}
            </p>
          )}
          {entry.comment && (
            <p>
              <strong>Message:</strong> {entry.comment}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const LOC = ({ location }: { location: string }) => {
  return <>&bull; {location}</>
}

function formatLocation(city: string, state: string) {
  let loc = ''
  if (city) {
    loc = city
    if (state) {
      loc += `, ${state}`
    }
  } else if (state) {
    loc = state
  }

  return loc
}

type Person = {
  name: string
  city: string
  state: string
}
const PersonCard = ({ name, city, state }: Person) => {
  let location: string[] = []
  city && location.push(city)
  state && location.push(state)

  return (
    <Grid
      item
      className='rounded-md p-2 '
      sx={{
        backgroundColor: '#b9f296',
        flex: 1,
        maxWidth: 'max-content',
        width: 0,
      }}
    >
      <Typography
        variant='body2'
        fontSize={12}
        component='div'
      >
        <OverflowTip text={name}></OverflowTip>
        <OverflowTip text={location.join(', ')}></OverflowTip>
      </Typography>
    </Grid>
  )
}

const ConnectorDot = () => (
  <TimelineSeparator>
    <TimelineConnector />
    <TimelineDot
      variant='outlined'
      color='primary'
    />
    <TimelineConnector />
  </TimelineSeparator>
)
