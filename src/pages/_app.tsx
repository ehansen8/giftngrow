import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'

export const colors = {
  dark: '#191919',
  darkGreen: '#59923A',
  green: '#66B539',
  lightGreen: '#E8F7D0',
  greenLightGreen: '#A7D685',
  light: '#EEF0F2',
}

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
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
