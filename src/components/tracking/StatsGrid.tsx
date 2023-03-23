import {
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material'
import { Entry } from '../../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { UseQueryResult } from 'react-query'
import { StatsType } from '../../lib/entities/stats.entity'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import { Dispatch, SetStateAction, useState } from 'react'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useTrackingStore } from '../../stores/trackingStore'
import { ClickAwayListener } from '@mui/base'
import fetchItem from '../../services/fetchItem'
import { useGetCodesQuery } from '../../queries/getCodesQuery'

export function StatsGrid({
  entriesQuery,
  globalStatsQuery,
}: {
  entriesQuery: UseQueryResult<Entry[], AxiosError>
  globalStatsQuery: UseQueryResult<StatsType, AxiosError>
}) {
  const activeCode = useTrackingStore((state) => state.activeCode)
  const { data } = entriesQuery
  const globalStats = globalStatsQuery.data

  let statCards: { value: number; body: string }[] = []
  if (activeCode && data) {
    statCards = getStats(data)
  } else if (globalStats) {
    statCards = getGlobalStats(globalStats)
  }

  return (
    <>
      <StatsTitle />
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
        {statCards.map((card, idx) => {
          return (
            <Card
              key={idx}
              sx={{
                backgroundColor: '#4a607b',
                aspectRatio: '1/1',
                height: '100%',
                color: 'white',
              }}
              elevation={4}
              className='rounded-full'
            >
              <CardContent className='!p-2 h-full rounded-full'>
                <div className='flex flex-col items-center h-full justify-center'>
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
}

function StatsTitle() {
  const activeCode = useTrackingStore((state) => state.activeCode)
  const [searching, setSearching] = useState(false)
  function startSearch() {
    setSearching(true)
  }

  function endSearch() {
    setSearching(false)
  }

  if (searching) {
    return <SearchCodeButton setSearching={endSearch} />
  }

  if (activeCode) {
    return <ActiveCodeButton setSearching={startSearch} />
  }

  return <NoCodeButton setSearching={startSearch} />
}

function ActiveCodeButton({ setSearching }: { setSearching: () => void }) {
  const { activeCode, setActiveCode } = useTrackingStore()
  const { data: codes } = useGetCodesQuery()
  const isSaved = codes?.some(({ code }) => code === activeCode)
  function handleSaveCode() {}

  return (
    <Box
      className='rounded-full mb-3 border-solid border-2 justify-center'
      textAlign='center'
      sx={{
        borderColor: 'primary.main',
        backgroundColor: 'inherit',
        margin: 'auto',
        display: 'flex',
        maxWidth: 'fit-content',
        width: '100%',
      }}
    >
      <IconButton onClick={handleSaveCode}>
        {isSaved ? (
          <Tooltip title='Remove from Saved Codes'>
            <StarIcon color='primary' />
          </Tooltip>
        ) : (
          <Tooltip title='Save This Code'>
            <StarOutlineIcon color='primary' />
          </Tooltip>
        )}
      </IconButton>
      <Typography
        variant='h6'
        margin='auto'
        color='black'
      >
        Tracking Code:
      </Typography>
      <Button
        variant='text'
        onClick={setSearching}
      >
        <Typography
          sx={{ textDecoration: 'underline' }}
          variant='h6'
          margin='auto'
          color='black'
        >
          {activeCode}
        </Typography>
      </Button>
      <IconButton
        className='ml-4'
        onClick={() => setActiveCode('')}
      >
        <CloseIcon sx={{ color: 'black' }} />
      </IconButton>
    </Box>
  )
}

function NoCodeButton({ setSearching }: { setSearching: () => void }) {
  return (
    <Tooltip
      title='Search Tracking Code'
      arrow
    >
      <Button
        className='rounded-full mb-3 border-solid border-2 justify-center'
        sx={{
          textTransform: 'none',
          display: 'flex',
          maxWidth: 'fit-content',
          margin: 'auto',
        }}
        onClick={setSearching}
      >
        <Typography
          marginX={2}
          variant='h6'
          color='black'
        >
          All Tracking Codes
        </Typography>
        <SearchIcon
          color='primary'
          sx={{ height: '32px', width: '32px' }}
        />
      </Button>
    </Tooltip>
  )
}

function SearchCodeButton({ setSearching }: { setSearching: () => void }) {
  const { activeCode, setActiveCode } = useTrackingStore()
  const [code, setCode] = useState(activeCode)
  const [errorMessage, setErrorMessage] = useState('')
  const [openToast, setOpenToast] = useState(false)

  function handleInput(value: string) {
    setCode(value.toUpperCase())
  }

  function handleEnter(key: string) {
    if (key === 'Enter') {
      handleSearch()
    }
  }

  async function handleSearch() {
    const err = await validateCode(code)
    if (err) {
      setErrorMessage(err)
      setOpenToast(true)
      return
    }
    setActiveCode(code)
    setSearching()
  }

  return (
    <ClickAwayListener onClickAway={setSearching}>
      <Box
        className='rounded-full mb-3 border-solid border-2 justify-center'
        textAlign='center'
        sx={{
          borderColor: 'primary.main',
          backgroundColor: 'inherit',
          margin: 'auto',
          display: 'flex',
          maxWidth: 'fit-content',
          width: '100%',
        }}
      >
        <Typography
          className='ml-3'
          variant='h6'
          margin='auto'
          color='black'
        >
          Tracking Code:
        </Typography>
        <MuiOtpInput
          mx={2}
          value={code}
          length={6}
          gap='2px'
          sx={{ width: '200px' }}
          onChange={handleInput}
          TextFieldsProps={{
            autoComplete: 'off',
            InputProps: { sx: { height: '35px' } },
            inputProps: { className: 'p-0' },
          }}
          onKeyDown={({ key }) => handleEnter(key)}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon
            color='primary'
            sx={{ height: '32px', width: '32px' }}
          />
        </IconButton>
        <Snackbar
          open={openToast}
          autoHideDuration={4000}
          onClose={() => setOpenToast(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setOpenToast(false)}
            severity='error'
            variant='filled'
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ClickAwayListener>
  )
}

async function validateCode(code: string) {
  if (!code) {
    return 'Missing Code'
  }
  if (code.length != 6) {
    return 'Code Must Be 6 Characters'
  }

  const res = await fetchItem(code)
  if (res.error) {
    return res.error
  }

  if (!res.data) {
    return 'Invalid Code'
  }

  return ''
}

function getGlobalStats({ states, cities, times_gifted }: StatsType) {
  return [
    { value: cities, body: 'Cities' },
    { value: states, body: 'States' },
    { value: times_gifted, body: 'Total Entries' },
  ]
}

function getStats(entries: Entry[]) {
  const cities = new Set()
  const states = new Set()
  entries.forEach((entry) => {
    if (entry.giverCity) cities.add(entry.giverCity)
    if (entry.recipCity) cities.add(entry.recipCity)
    if (entry.giverState) states.add(entry.giverState)
    if (entry.recipState) states.add(entry.recipState)
  })

  return [
    { value: cities.size, body: 'Cities' },
    { value: states.size, body: 'States' },
    { value: entries.length, body: 'Total Entries' },
  ]
}
