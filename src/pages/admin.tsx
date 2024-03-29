import {
  Button,
  CircularProgress,
  Dialog,
  TextField,
  Typography,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useState } from 'react'
import { createBulkCodes } from '../services/createBulkCodes'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { logger } from '../lib/logger'
import getAllEntries from '../services/getAllEntries'
import { Entry } from '../lib/entities/entry.entity'
import { User } from '../lib/entities/user.entity'
import { BaseTable } from '../components/admin/BaseTable'
import getAllUsers from '../services/getAllUsers'

// Also probably SSR this page

const validUsers = [
  'ehansen8@wisc.edu',
  'evanjhans@gmail.com',
  'cmtsmartin@hotmail.com',
  'team@giftngrow.com',
  'ecmtsmartin5@gmail.com',
]
export default function Admin() {
  const { data: session, status } = useSession()
  const [tab, setTab] = useState('codes')
  const handleTabChange = (event: React.SyntheticEvent, newTab: string) => {
    setTab(newTab)
  }
  const maxPages = 10
  const entriesQuery = useQuery<Entry[], AxiosError>(['all_entries'], () =>
    getAllEntries()
  )
  const usersQuery = useQuery<User[], AxiosError>(['all_users'], () =>
    getAllUsers()
  )

  const [numPages, setNumPages] = useState<number | undefined>(1)
  const [errorMessage, setErrorMessage] = useState('')
  //Need to use refetch since the query is only triggered onClick
  const { isFetching, refetch } = useQuery<Blob, AxiosError>(
    'fetchCodePDF',
    () => createBulkCodes(numPages as number),
    {
      enabled: false,
      onSuccess: downloadCodes,
      onError: (err) => setErrorMessage(err.message),
    }
  )

  function downloadCodes(pdfData: Blob) {
    const blob = new Blob([pdfData], { type: 'application/pdf' })
    const fileURL = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = fileURL
    if (process.env.NEXT_PUBLIC_BRANCH == 'prod') {
      link.download = 'ProductionCodes.pdf'
    } else {
      link.download = 'TestCodes.pdf'
    }

    link.click()
    window.URL.revokeObjectURL(fileURL)
  }

  function handleClickDownload() {
    logger.info({ numPages }, 'Codes were downloaded')
    if (numPages && numPages >= 1) refetch()
    else {
      setErrorMessage('You need a value between 1 and 10')
    }
  }

  function handleSetPages(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('')
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      setNumPages(undefined)
      return
    }
    if (value < 1) {
      setNumPages(1)
      return
    }
    setNumPages(Math.min(value, maxPages))
  }

  if (status === 'loading') {
    return <main>Loading...</main>
  }

  if (!validUsers.includes(session?.user?.email as string)) {
    return <main>Access Denied</main>
  }
  return (
    <main className='p-4 rounded-md mt-4 flex flex-col items-center bg-white max-w-full'>
      <h1 className='m-0'>Welcome to the Admin Page</h1>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleTabChange}
            aria-label='lab API tabs example'
          >
            <Tab
              label='Get Codes'
              value='codes'
            />
            <Tab
              label='Entries'
              value='entries'
            />
            <Tab
              label='Users'
              value='users'
            />
          </TabList>
        </Box>
        <TabPanel value={'codes'}>
          <div className='flex flex-col gap-3'>
            <Dialog
              open={isFetching}
              PaperProps={{
                style: {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  overflow: 'hidden',
                },
              }}
            >
              <CircularProgress
                sx={{
                  position: 'fixed',
                  top: '25%',
                  left: '50%',
                  marginTop: '-20px',
                  marginLeft: '-20px',
                }}
              />
            </Dialog>

            <Typography width={400}>
              Enter how many pages of codes you'd like to download below. Each
              page contains 25 codes. The max number of pages you can download
              at once is 10 (for now).
            </Typography>
            <TextField
              label='Number of Pages'
              type='number'
              value={numPages}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              className='text-center'
              size='small'
              onChange={handleSetPages}
            ></TextField>
            <Button
              className='w-full'
              LinkComponent={Link}
              href='#'
              //href={`/api/items/generate?pages=${numPages}`}
              variant='contained'
              onClick={handleClickDownload}
            >
              Download {numPages && 25 * numPages} Codes
            </Button>
            <Typography
              color='error'
              fontSize={12}
              textAlign='center'
            >
              {errorMessage}
            </Typography>
          </div>
        </TabPanel>
        <TabPanel
          value={'entries'}
          className='w-full p-0'
        >
          {entriesQuery.data && (
            <BaseTable
              data={entriesQuery.data}
              headers={Entry.Headers}
            />
          )}
        </TabPanel>
        <TabPanel
          value={'users'}
          className='w-full p-0'
        >
          {usersQuery.data && (
            <BaseTable
              data={usersQuery.data}
              headers={User.Headers}
            />
          )}
        </TabPanel>
      </TabContext>
    </main>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       session: await getServerSession(context.req, context.res, authOptions),
//     },
//   }
// }
