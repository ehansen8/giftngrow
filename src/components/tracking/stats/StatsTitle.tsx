import { useState } from 'react'
import { useTrackingStore } from '../../../stores/trackingStore'
import { SearchCodeButton } from './SearchCodeButton'
import { NoCodeButton } from './NoCodeButton'
import { ActiveCodeButton } from './ActiveCodeButton'

export function StatsTitle() {
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
