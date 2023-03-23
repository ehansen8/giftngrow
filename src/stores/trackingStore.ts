import { UseQueryResult } from 'react-query'
import { create } from 'zustand'

type State = {
  activeCode: string
  setActiveCode: (code: string) => void
  codesQuery: UseQueryResult | undefined
  setCodesQuery: (query: UseQueryResult) => void
}

const useTrackingStore = create<State>((set) => ({
  activeCode: '',
  setActiveCode: (activeCode) => set({ activeCode }),
  codesQuery: undefined,
  setCodesQuery: (codesQuery: UseQueryResult) => set({ codesQuery }),
}))

export { useTrackingStore }
