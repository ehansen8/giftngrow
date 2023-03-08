import { Typography, Card, CardContent } from '@mui/material'
import { colors } from '../../colors'
import { Entry } from '../../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { UseQueryResult } from 'react-query'
import { StatsType } from '../../lib/entities/stats.entity'

export function StatsGrid({
  activeCode,
  entriesQuery,
  globalStatsQuery,
}: {
  activeCode?: string
  entriesQuery: UseQueryResult<Entry[], AxiosError>
  globalStatsQuery: UseQueryResult<StatsType, AxiosError>
}) {
  const { data, isLoading, isError, error } = entriesQuery
  const globalStats = globalStatsQuery.data

  let statCards: { value: number; body: string }[] = []
  if (activeCode && data) {
    statCards = getStats(data)
  } else if (globalStats) {
    statCards = getGlobalStats(globalStats)
  }

  return (
    <>
      <Typography
        className='rounded-full mb-3 border-solid border-2'
        variant='h6'
        textAlign='center'
        sx={{
          borderColor: 'primary.main',
          backgroundColor: 'inherit',
          width: '75%',
          margin: 'auto',
          color: colors.dark,
        }}
      >
        {activeCode
          ? 'Tracking Code: ' + activeCode
          : 'All Tracking Code Stats'}
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
        {statCards.map((card, idx) => {
          console.log(idx)
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

function getGlobalStats({ states, cities, times_gifted }: StatsType) {
  return [
    { value: cities, body: 'Cities' },
    { value: states, body: 'States' },
    { value: times_gifted, body: 'Times Gifted' },
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
    { value: entries.length, body: 'Times Gifted' },
  ]
}
