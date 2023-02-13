import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='icon'
          href='/gng_logo.png'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='beforeInteractive'
        />
      </body>
    </Html>
  )
}
