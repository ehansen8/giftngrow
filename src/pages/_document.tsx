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
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`}
          strategy='beforeInteractive'
        />
      </body>
    </Html>
  )
}
