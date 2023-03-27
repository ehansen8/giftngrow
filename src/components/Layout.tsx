import Head from 'next/head'
import { ReactNode } from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import { OneTap } from './OneTap'
import TestSiteAlert from './TestSiteAlert'

export default function Layout({
  children,
  childNav,
}: {
  children: ReactNode
  childNav: JSX.Element | undefined
}) {
  return (
    <>
      <Head>
        <title>Gift 'n Grow</title>
        <meta
          //TODO: rewrite this stuff
          name='description'
          content="Track your Gift 'n Grow Wrap"
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <OneTap />
      <NavBar childNav={childNav} />
      <TestSiteAlert />
      {children}
      <Footer />
    </>
  )
}
