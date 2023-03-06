import { Typography, Card, CardContent } from '@mui/material'
import { colors } from '../../colors'
import { Entry } from '../../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { UseQueryResult } from 'react-query'

export function StatsGrid({
  activeCode,
  entriesQuery,
}: {
  activeCode?: string
  entriesQuery: UseQueryResult<Entry[], AxiosError>
}) {
  const { data, isLoading, isError, error } = entriesQuery
  let statCards: { value: number; body: string }[] = []
  if (data) {
    statCards = getStats(data)
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
        {statCards.map((card) => {
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
