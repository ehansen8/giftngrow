import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import Layout from '../components/Layout'
import { colors } from '../colors'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: colors.primary,
    },
    secondary: {
      // This is green.A700 as hex.
      main: colors.secondary,
    },
  },
})

const queryClient = new QueryClient()

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => <Layout childNav={undefined}>{page}</Layout>)
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  )
}
