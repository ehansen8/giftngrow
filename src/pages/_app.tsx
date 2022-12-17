import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import Layout from '../components/Layout'
import { colors } from '../colors'
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: colors.green,
    },
    secondary: {
      // This is green.A700 as hex.
      main: colors.dark,
    },
  },
})

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Script
              src='https://accounts.google.com/gsi/client'
              strategy='beforeInteractive'
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  )
}
