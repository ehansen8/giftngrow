import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useSession, getSession } from 'next-auth/react'
import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'
import { createBulkCodes } from '../services/createBulkCodes'
import { URL } from 'url'
import Link from 'next/link'

//TODO: add valid users to DB
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
  //const [code, getCode] = useGetCode()
  const [numPages, setNumPages] = useState(1)

  async function downloadCodes() {
    const data = await createBulkCodes(numPages)
    console.log(data)
    const blob = new Blob([data])
    const fileURL = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = fileURL
    link.download = 'TrackingCodes1.pdf'
    link.click()
    window.URL.revokeObjectURL(fileURL)
  }

  function handleSetPages(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    if (isNaN(value)) {
      setNumPages(1)
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
    <main className='p-4 rounded-md mt-4 flex flex-col items-center bg-white'>
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
            <Typography width={400}>
              Enter how many pages of codes you'd like to download below. Each
              page contains 25 codes. The max number of pages you can download
              at once is 10 (for now).
            </Typography>
            <TextField
              onChange={handleSetPages}
              value={numPages}
              className='text-center'
              type='number'
              label='Number of Pages'
              size='small'
            ></TextField>
            <Button
              className='w-full'
              LinkComponent={Link}
              href={`/api/getCodes?pages=${numPages}`}
              variant='contained'
              //onClick={downloadCodes}
            >
              Download {!isNaN(numPages) && 25 * numPages} Codes
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={'entries'}>
          <TestTable />
        </TabPanel>
        <TabPanel value={'users'}>
          <TestTable />
        </TabPanel>
      </TabContext>
    </main>
  )
}

function TestTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell>Dessert</TableCell>
          <TableCell>Calories</TableCell>
          <TableCell>Fat&nbsp;(g)</TableCell>
          <TableCell>Carbs&nbsp;(g)</TableCell>
          <TableCell>Protein&nbsp;(g)</TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// const gen = BigInt(13) ** BigInt(11)
// const mod = BigInt(7) ** BigInt(19)
// const possibleChars = '01GHJKLMNPQRSTVWXYZ'

// function useGetCode(): [string, () => void] {
//   const [previous, setPrevious] = useState(BigInt(333341833290882))
//   const [code, setCode] = useState('')

//   function getNextCode() {
//     const next = (previous + gen) % mod
//     let temp = next
//     let output = ''
//     for (let i = 0; i < 6; i++) {
//       const index = temp % BigInt(19)
//       output += possibleChars[Number(index)]
//       temp = temp / BigInt(19)
//     }
//     setPrevious(next)
//     setCode(output)
//     console.log(next.toString(), output)
//   }

//   useEffect(() => getNextCode(), [])

//   return [code, getNextCode]
// }
