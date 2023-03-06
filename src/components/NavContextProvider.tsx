import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

type NavContextType = {
  ChildNav: JSX.Element | undefined
  setChildNav: Dispatch<SetStateAction<JSX.Element | undefined>>
}

export const NavContext = createContext<NavContextType>({
  ChildNav: undefined,
  setChildNav: () => {},
})

export function NavContextProvider({ children }: { children: ReactNode }) {
  const [childNav, setChildNav] = useState<JSX.Element | undefined>(undefined)

  return (
    <NavContext.Provider
      value={{ ChildNav: childNav, setChildNav: setChildNav }}
    >
      {children}
    </NavContext.Provider>
  )
}
