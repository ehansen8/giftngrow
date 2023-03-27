import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useState, ReactElement, useEffect } from 'react'
import TrackingAppBar from '../components/TrackingAppBar'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import AddCodeModal from '../components/AddCodes/AddCodeModal'
import { BagTimeline } from '../components/tracking/BagTimeline'
import { StatsGrid } from '../components/tracking/stats/StatsGrid'
import { NoBagsView } from '../components/tracking/NoBagsView'
import { NextPageWithLayout } from './_app'
import Layout from '../components/Layout'
import { StatsType } from '../lib/entities/stats.entity'
import getGlobalStats from '../services/getGlobalStats'
import { GetServerSidePropsContext } from 'next'
import { useTrackingStore } from '../stores/trackingStore'
import { useGetCodesQuery } from '../queries/getCodesQuery'
import { useUserAPI } from '../hooks/useUserAPI'
import GoogleMap from '../components/GoogleMap'
import { useGetEntriesQuery } from '../queries/getEntriesQuery'

type urlQueryT = {
  code?: string
}
const Tracking: NextPageWithLayout = ({ code }: urlQueryT) => {
  const setActiveCode = useTrackingStore((state) => state.setActiveCode)

  // if the code exists, sets it in the store
  useEffect(() => {
    if (code) {
      setActiveCode(code)
    }
  }, [setActiveCode, code])

  const userAPI = useUserAPI()
  const codesQuery = useGetCodesQuery()
  const entriesQuery = useGetEntriesQuery()

  const statsQuery = useQuery<StatsType, AxiosError>(['global stats'], () =>
    getGlobalStats(),
  )

  const [open, setOpen] = useState(false)
  const [openToast, setOpenToast] = useState(false)

  function handleAddCode() {
    setOpen(true)
  }

  async function handleSuccessfulAddCode(code: string) {
    //Subscribe User to newly added code
    await userAPI.addTrackingCode(code)
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
        <StatsGrid globalStatsQuery={statsQuery} />
        <GoogleMap />
        {(!codesQuery.data || codesQuery.data.length <= 0) && (
          <NoBagsView handleClick={handleAddCode} />
        )}
        <BagTimeline />
        <AddCodeModal
          open={open}
          setOpen={setOpen}
          onAddCode={handleSuccessfulAddCode}
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
