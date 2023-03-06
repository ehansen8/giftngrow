import {
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Entry } from '../lib/entities/entry.entity'
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined'
import { colors } from '../colors'
import { TimelineSeparator, TimelineConnector } from '@mui/lab'
import OverflowTip from './OverflowTip'

type TimelineEntryProps = {
  entry: Entry
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
const EntryCard = ({ entry }: { entry: Entry }) => (
  <Card
    sx={{ backgroundColor: colors.greenLightGreen }}
    raised
    elevation={2}
  >
    <CardContent className='flex flex-col gap-3 !p-2 pr-0'>
      <div className='flex flex-row justify-between pt-1'>
        <Grid
          container
          className='gap-2'
          wrap='nowrap'
        >
          {entry.giverFN && (
            <PersonCard
              name={entry.giverFN}
              city={entry.giverCity}
              state={entry.giverState}
            />
          )}
          <VolunteerActivismOutlinedIcon className='self-center' />
          {entry.recipFN && (
            <PersonCard
              name={entry.recipFN}
              city={entry.recipCity}
              state={entry.recipState}
            />
          )}
        </Grid>
        <div className='self-center'>
          <IconButton
            sx={{
              color: colors.dark,
            }}
          >
            <UnfoldMoreIcon />
          </IconButton>
        </div>
      </div>
      {entry.gift && (
        <>
          <Divider variant='middle' />
          <Typography
            className='rounded-md p-1 mr-1'
            sx={{ backgroundColor: colors.lightGreen }}
            variant='subtitle2'
          >
            {entry.gift}
          </Typography>
        </>
      )}
      {entry.occasion && (
        <>
          <Divider variant='middle' />
          <Typography
            className='rounded-md p-1 mr-1'
            sx={{ backgroundColor: colors.lightGreen }}
            variant='subtitle2'
          >
            {entry.occasion}
          </Typography>
        </>
      )}
      {entry.comment && (
        <>
          <Divider variant='middle' />
          <Typography
            className='rounded-md p-1 mr-1'
            sx={{ backgroundColor: colors.lightGreen }}
            variant='subtitle2'
          >
            {entry.comment}
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
)

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
        backgroundColor: colors.lightGreen,
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
