import { create } from 'zustand'

type State = {
  activeCode: string
  setActiveCode: (code: string) => void
}

const useTrackingStore = create<State>((set) => ({
  activeCode: '',
  setActiveCode: (activeCode) => set({ activeCode }),
}))

export { useTrackingStore }
