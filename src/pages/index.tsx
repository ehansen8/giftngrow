import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useState, ReactElement, useEffect } from 'react'
import TrackingAppBar from '../components/TrackingAppBar'
import { Entry } from '../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import fetchEntries from '../services/fetchEntries'
import AddCodeModal from '../components/AddCodes/AddCodeModal'
import { BagTimeline } from '../components/tracking/BagTimeline'
import { StatsGrid } from '../components/tracking/StatsGrid'
import { NoBagsView } from '../components/tracking/NoBagsView'
import { NextPageWithLayout } from './_app'
import Layout from '../components/Layout'
import { StatsType } from '../lib/entities/stats.entity'
import getGlobalStats from '../services/getGlobalStats'
import { GetServerSidePropsContext } from 'next'
import { useTrackingStore } from '../stores/trackingStore'
import { useGetCodesQuery } from '../queries/getCodesQuery'

type urlQueryT = {
  code?: string
}
const Tracking: NextPageWithLayout = ({ code }: urlQueryT) => {
  const { activeCode, setActiveCode } = useTrackingStore((state) => state)

  // if the code exists, sets it in the store
  useEffect(() => {
    if (code) {
      setActiveCode(code)
    }
  }, [setActiveCode, code])

  const codesQuery = useGetCodesQuery()
  const entriesQuery = useQuery<Entry[], AxiosError>(
    ['entries', activeCode],
    () => fetchEntries(activeCode as string),
    { enabled: !!activeCode },
  )

  const statsQuery = useQuery<StatsType, AxiosError>(['global stats'], () =>
    getGlobalStats(),
  )

  const [open, setOpen] = useState(false)
  const [openToast, setOpenToast] = useState(false)

  function handleAddCode() {
    setOpen(true)
  }

  function handleSuccessfulAddCode(code: string) {
    setOpenToast(true)
    setActiveCode(code)
    codesQuery.refetch()
    entriesQuery.refetch()
  }

  return (
    <Layout
      childNav={
        <TrackingAppBar
          handleMenuClick={(code: string) => setActiveCode(code)}
          handleAddCode={handleAddCode}
        />
      }
    >
      <main
        className='py-4 rounded-md px-2'
        style={{ backgroundColor: 'white' }}
      >
        <StatsGrid
          entriesQuery={entriesQuery}
          globalStatsQuery={statsQuery}
        />
        {(!codesQuery.data || codesQuery.data.length <= 0) && (
          <NoBagsView handleClick={handleAddCode} />
        )}
        <BagTimeline entriesQuery={entriesQuery} />
        <AddCodeModal
          open={open}
          setOpen={setOpen}
          onAdd={handleSuccessfulAddCode}
        />
        <Snackbar
          open={openToast}
          autoHideDuration={4000}
          onClose={() => setOpenToast(false)}
        >
          <Alert
            onClose={() => setOpenToast(false)}
            severity='info'
          >
            {`New entry successfully added!`}
          </Alert>
        </Snackbar>
      </main>
    </Layout>
  )
}

Tracking.getLayout = function getLayout(page: ReactElement) {
  return page
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { code: context.query.code ?? '' },
  }
}

export default Tracking
