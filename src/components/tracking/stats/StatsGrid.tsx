import { IEntry } from '../../../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { UseQueryResult } from 'react-query'
import { StatsType } from '../../../lib/entities/stats.entity'
import { useTrackingStore } from '../../../stores/trackingStore'
import { useGetEntriesQuery } from '../../../queries/getEntriesQuery'
import { StatsCard } from './StatsCard'
import { StatsTitle } from './StatsTitle'

export function StatsGrid({
  globalStatsQuery,
}: {
  globalStatsQuery: UseQueryResult<StatsType, AxiosError>
}) {
  const activeCode = useTrackingStore((state) => state.activeCode)
  const { data } = useGetEntriesQuery()
  const globalStats = globalStatsQuery.data

  let statCards: { value: number; body: string }[] = []
  if (activeCode && data) {
    statCards = calcStats(data)
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
            <StatsCard
              key={idx}
              card={card}
            />
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
    { value: times_gifted, body: 'Total Entries' },
  ]
}

function calcStats(entries: IEntry[]) {
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
