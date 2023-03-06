import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { useState, ReactElement } from 'react'
import TrackingAppBar from '../components/TrackingAppBar'
import { Entry } from '../lib/entities/entry.entity'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import fetchEntries from '../services/fetchEntries'
import { TrackingCode } from '../lib/entities/trackingCode.entity'
import { User } from '../lib/entities/user.entity'
import fetchCodes from '../services/fetchCodes'
import { useSession } from 'next-auth/react'
import AddCodeModal from '../components/AddCodes/AddCodeModal'
import { BagTimeline } from '../components/tracking/BagTimeline'
import { StatsGrid } from '../components/tracking/StatsGrid'
import { NoBagsView } from '../components/tracking/NoBagsView'
import { NextPageWithLayout } from './_app'
import Layout from '../components/Layout'

const Tracking: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [activeCode, setActiveCode] = useState<string | undefined>(undefined)
  const codesQuery = useQuery<TrackingCode[], AxiosError>(
    ['codes', user],
    () => fetchCodes(user as User),
    { enabled: !!user },
  )
  const entriesQuery = useQuery<Entry[], AxiosError>(
    ['entries', activeCode],
    () => fetchEntries(activeCode as string),
    { enabled: !!activeCode },
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
          codesQuery={codesQuery}
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
          activeCode={activeCode}
          entriesQuery={entriesQuery}
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

export default Tracking
