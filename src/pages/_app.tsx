import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import Layout from '../components/Layout'
import { colors } from '../colors'

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
